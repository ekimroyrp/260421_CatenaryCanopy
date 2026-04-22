import * as THREE from 'three'

import {
  buildFlatMeshData,
  type FlatMeshData,
  type OutlinePoint,
  type TriangleIndices,
} from './geometry'

interface SpringConstraint {
  a: number
  b: number
  baseLength: number
  restLength: number
  stiffness: number
}

interface CanopyMaterialStyle {
  color: number
  metalness: number
  roughness: number
  clearcoat: number
  clearcoatRoughness: number
  envMapIntensity: number
  iridescence: number
  iridescenceIOR: number
  iridescenceThicknessRange: [number, number]
  reflectivity: number
  specularIntensity: number
  sheen: number
  sheenRoughness: number
  sheenColor: number
  eggIridescence: number
  eggIridescenceFrequency: number
}

export interface AnchorVertex {
  index: number
  pinned: boolean
  position: THREE.Vector3
}

export interface CanopySimulationParams {
  gravity: number
  damping: number
  substeps: number
  constraintIterations: number
  stiffness: number
  restLengthScale: number
  compressionResistance: number
  maxDeltaTime: number
  pointPickSize: number
}

export interface CanopySimulationState {
  gravity: number
  positions: THREE.Vector3[]
  previousPositions: THREE.Vector3[]
  velocities: THREE.Vector3[]
  restPositions: THREE.Vector3[]
  pinnedTargets: THREE.Vector3[]
  triangles: TriangleIndices[]
  springs: SpringConstraint[]
  geometry: THREE.BufferGeometry
}

const DEFAULT_PARAMS: CanopySimulationParams = {
  gravity: 9.81,
  damping: 4.2,
  substeps: 4,
  constraintIterations: 10,
  stiffness: 0.92,
  restLengthScale: 1.08,
  compressionResistance: 0.18,
  maxDeltaTime: 1 / 24,
  pointPickSize: 0.14,
}

const WIRE_SURFACE_OFFSET = 0.004
const VERTEX_SURFACE_OFFSET = 0.014
const FOIL_MATERIAL_STYLE: CanopyMaterialStyle = {
  color: 0xf1f5ff,
  metalness: 1,
  roughness: 0.28,
  clearcoat: 1,
  clearcoatRoughness: 0.24,
  envMapIntensity: 1.9,
  iridescence: 0.72,
  iridescenceIOR: 1.22,
  iridescenceThicknessRange: [140, 460],
  reflectivity: 1,
  specularIntensity: 1,
  sheen: 0.1,
  sheenRoughness: 0.5,
  sheenColor: 0xe7eeff,
  eggIridescence: 1.05,
  eggIridescenceFrequency: 1.25,
}

const MATTE_MATERIAL_STYLE: CanopyMaterialStyle = {
  color: 0xc2d5f2,
  metalness: 0.04,
  roughness: 0.86,
  clearcoat: 0,
  clearcoatRoughness: 0,
  envMapIntensity: 0,
  iridescence: 0.18,
  iridescenceIOR: 1.22,
  iridescenceThicknessRange: [140, 460],
  reflectivity: 0.18,
  specularIntensity: 0.22,
  sheen: 0,
  sheenRoughness: 1,
  sheenColor: 0xffffff,
  eggIridescence: 0.42,
  eggIridescenceFrequency: 1.1,
}

export class CanopySimulation {
  readonly mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>
  readonly pickPoints: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>
  readonly flatMesh: FlatMeshData
  readonly state: CanopySimulationState

  private readonly params: CanopySimulationParams
  private readonly pinnedMask: boolean[]
  private readonly wireEdgePairs: number[]
  private readonly wireOverlay: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>
  private readonly tempVectorA = new THREE.Vector3()
  private readonly tempVectorB = new THREE.Vector3()
  private readonly eggIridescenceState: {
    strength: number
    frequency: number
    uniforms:
      | null
      | {
          uEggIridescence: { value: number }
          uEggIridescenceFrequency: { value: number }
        }
  }

  constructor(outline: readonly OutlinePoint[], params: Partial<CanopySimulationParams> = {}) {
    this.params = {
      ...DEFAULT_PARAMS,
      ...params,
    }

    this.flatMesh = buildFlatMeshData(outline)

    const restPositions = this.flatMesh.vertices.map(
      (vertex) => new THREE.Vector3(vertex.x, 0, vertex.y),
    )
    const positions = restPositions.map((position) => position.clone())
    const previousPositions = restPositions.map((position) => position.clone())
    const velocities = restPositions.map(() => new THREE.Vector3())
    const pinnedTargets = restPositions.map((position) => position.clone())
    const springs = buildSpringConstraints(
      this.flatMesh.triangles,
      restPositions,
      this.params.stiffness,
      this.params.restLengthScale,
    )

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(restPositions.length * 3), 3),
    )
    geometry.setIndex(this.flatMesh.triangles.flat())

    this.state = {
      gravity: this.params.gravity,
      positions,
      previousPositions,
      velocities,
      restPositions,
      pinnedTargets,
      triangles: this.flatMesh.triangles,
      springs,
      geometry,
    }

    this.pinnedMask = restPositions.map(() => false)
    this.wireEdgePairs = buildWireEdgePairs(this.flatMesh.triangles)
    this.eggIridescenceState = {
      strength: FOIL_MATERIAL_STYLE.eggIridescence,
      frequency: FOIL_MATERIAL_STYLE.eggIridescenceFrequency,
      uniforms: null,
    }

    this.mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhysicalMaterial({
        color: FOIL_MATERIAL_STYLE.color,
        metalness: FOIL_MATERIAL_STYLE.metalness,
        roughness: FOIL_MATERIAL_STYLE.roughness,
        clearcoat: FOIL_MATERIAL_STYLE.clearcoat,
        clearcoatRoughness: FOIL_MATERIAL_STYLE.clearcoatRoughness,
        envMapIntensity: FOIL_MATERIAL_STYLE.envMapIntensity,
        iridescence: FOIL_MATERIAL_STYLE.iridescence,
        iridescenceIOR: FOIL_MATERIAL_STYLE.iridescenceIOR,
        iridescenceThicknessRange: FOIL_MATERIAL_STYLE.iridescenceThicknessRange,
        reflectivity: FOIL_MATERIAL_STYLE.reflectivity,
        specularIntensity: FOIL_MATERIAL_STYLE.specularIntensity,
        sheen: FOIL_MATERIAL_STYLE.sheen,
        sheenRoughness: FOIL_MATERIAL_STYLE.sheenRoughness,
        sheenColor: new THREE.Color(FOIL_MATERIAL_STYLE.sheenColor),
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }),
    )
    this.installEggIridescenceShader()

    const wireGeometry = new THREE.BufferGeometry()
    wireGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(this.wireEdgePairs.length * 3), 3),
    )
    this.wireOverlay = new THREE.LineSegments(
      wireGeometry,
      new THREE.LineBasicMaterial({
        color: 0x37506c,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        toneMapped: false,
      }),
    )
    this.wireOverlay.visible = true
    this.wireOverlay.frustumCulled = false
    this.wireOverlay.renderOrder = 3
    this.mesh.add(this.wireOverlay)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = false
    this.mesh.userData.simulation = this

    const pickGeometry = new THREE.BufferGeometry()
    pickGeometry.setAttribute(
      'position',
      this.state.geometry.getAttribute('position'),
    )
    this.pickPoints = new THREE.Points(
      pickGeometry,
      new THREE.PointsMaterial({
        size: this.params.pointPickSize * 0.72,
        sizeAttenuation: true,
        color: 0xd8ebff,
        transparent: true,
        opacity: 0.44,
        depthWrite: false,
        toneMapped: false,
      }),
    )
    this.pickPoints.frustumCulled = false
    this.pickPoints.renderOrder = 2

    this.syncGeometry()
  }

  update(deltaTime: number): void {
    const stepDelta = Math.min(deltaTime, this.params.maxDeltaTime)
    if (stepDelta <= 0) {
      return
    }

    const substepDelta = stepDelta / this.params.substeps
    for (let substep = 0; substep < this.params.substeps; substep += 1) {
      this.step(substepDelta)
    }

    this.syncGeometry()
  }

  settle(frames = 8, deltaTime = 1 / 60): void {
    const safeFrames = Math.max(1, Math.round(frames))
    for (let frame = 0; frame < safeFrames; frame += 1) {
      this.update(deltaTime)
    }
  }

  reset(): void {
    for (let index = 0; index < this.state.positions.length; index += 1) {
      const resetPosition = this.pinnedMask[index]
        ? this.state.pinnedTargets[index]
        : this.state.restPositions[index]

      this.state.positions[index].copy(resetPosition)
      this.state.previousPositions[index].copy(resetPosition)
      this.state.velocities[index].set(0, 0, 0)
      if (!this.pinnedMask[index]) {
        this.state.pinnedTargets[index].copy(this.state.restPositions[index])
      }
    }

    this.syncGeometry()
  }

  setGravity(gravity: number): void {
    this.state.gravity = Math.max(0, gravity)
  }

  setRestLengthScale(scale: number): void {
    const nextScale = THREE.MathUtils.clamp(scale, 1, 1.5)
    this.params.restLengthScale = nextScale
    for (const spring of this.state.springs) {
      spring.restLength = spring.baseLength * nextScale
    }
  }

  setSpringStrength(strength: number): void {
    const nextStrength = THREE.MathUtils.clamp(strength, 0.1, 2)
    this.params.stiffness = nextStrength
    for (const spring of this.state.springs) {
      spring.stiffness = nextStrength
    }
  }

  setPinned(index: number, pinned: boolean): void {
    if (index < 0 || index >= this.pinnedMask.length) {
      return
    }

    if (this.pinnedMask[index] === pinned) {
      return
    }

    this.pinnedMask[index] = pinned
    if (pinned) {
      this.state.pinnedTargets[index].copy(this.state.positions[index])
      this.state.previousPositions[index].copy(this.state.positions[index])
      this.state.velocities[index].set(0, 0, 0)
    } else {
      this.state.previousPositions[index].copy(this.state.positions[index])
      this.state.velocities[index].set(0, 0, 0)
    }
  }

  togglePinned(index: number): boolean {
    this.setPinned(index, !this.isPinned(index))
    return this.isPinned(index)
  }

  clearPins(): void {
    for (let index = 0; index < this.pinnedMask.length; index += 1) {
      this.pinnedMask[index] = false
      this.state.previousPositions[index].copy(this.state.positions[index])
      this.state.velocities[index].set(0, 0, 0)
    }
  }

  isPinned(index: number): boolean {
    return this.pinnedMask[index] ?? false
  }

  getPinnedCount(): number {
    let count = 0
    for (const pinned of this.pinnedMask) {
      if (pinned) {
        count += 1
      }
    }

    return count
  }

  getVertexCount(): number {
    return this.state.positions.length
  }

  getAnchorVertices(): AnchorVertex[] {
    const anchors: AnchorVertex[] = []

    for (let index = 0; index < this.state.positions.length; index += 1) {
      if (!this.pinnedMask[index]) {
        continue
      }

      anchors.push({
        index,
        pinned: true,
        position: this.getDisplayVertexPosition(index),
      })
    }

    return anchors
  }

  getDisplayVertexPosition(index: number, target = new THREE.Vector3()): THREE.Vector3 {
    return target.copy(this.state.positions[index]).setY(-this.state.positions[index].y)
  }

  setPinnedVertexDisplayHeight(index: number, displayHeight: number): void {
    if (!this.isPinned(index)) {
      return
    }

    const restPosition = this.state.restPositions[index]
    const nextHeight = THREE.MathUtils.clamp(displayHeight, -20, 20)
    const solverTarget = this.state.pinnedTargets[index]
    solverTarget.set(restPosition.x, -nextHeight, restPosition.z)
    this.state.positions[index].copy(solverTarget)
    this.state.previousPositions[index].copy(solverTarget)
    this.state.velocities[index].set(0, 0, 0)
    this.syncGeometry()
  }

  setWireframeVisible(visible: boolean): void {
    this.wireOverlay.visible = visible
  }

  setReflectionEnabled(enabled: boolean): void {
    this.applyMaterialStyle(enabled ? FOIL_MATERIAL_STYLE : MATTE_MATERIAL_STYLE)
  }

  dispose(): void {
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    this.wireOverlay.geometry.dispose()
    this.wireOverlay.material.dispose()
    this.pickPoints.geometry.dispose()
    this.pickPoints.material.dispose()
  }

  private step(deltaTime: number): void {
    const gravityStep = this.state.gravity * deltaTime * deltaTime
    const dampingFactor = Math.exp(-this.params.damping * deltaTime)

    for (let index = 0; index < this.state.positions.length; index += 1) {
      if (this.pinnedMask[index]) {
        this.state.positions[index].copy(this.state.pinnedTargets[index])
        this.state.previousPositions[index].copy(this.state.pinnedTargets[index])
        this.state.velocities[index].set(0, 0, 0)
        continue
      }

      const current = this.state.positions[index]
      const previous = this.state.previousPositions[index]
      this.tempVectorA.copy(current)
      this.tempVectorB.copy(current).sub(previous).multiplyScalar(dampingFactor)
      current.add(this.tempVectorB)
      current.y -= gravityStep
      previous.copy(this.tempVectorA)
    }

    for (let iteration = 0; iteration < this.params.constraintIterations; iteration += 1) {
      for (const spring of this.state.springs) {
        this.solveSpring(spring)
      }

      for (let index = 0; index < this.state.positions.length; index += 1) {
        if (this.pinnedMask[index]) {
          this.state.positions[index].copy(this.state.pinnedTargets[index])
        }
      }
    }

    for (let index = 0; index < this.state.positions.length; index += 1) {
      if (this.pinnedMask[index]) {
        this.state.velocities[index].set(0, 0, 0)
        continue
      }

      this.state.velocities[index]
        .copy(this.state.positions[index])
        .sub(this.state.previousPositions[index])
        .multiplyScalar(1 / Math.max(deltaTime, 1e-6))
    }
  }

  private solveSpring(spring: SpringConstraint): void {
    const positionA = this.state.positions[spring.a]
    const positionB = this.state.positions[spring.b]
    const delta = this.tempVectorA.copy(positionB).sub(positionA)
    const distance = delta.length()

    if (distance < 1e-6) {
      return
    }

    const error = (distance - spring.restLength) / distance
    let correctionScale = error * spring.stiffness
    if (distance < spring.restLength) {
      correctionScale *= this.params.compressionResistance
    }
    const pinnedA = this.pinnedMask[spring.a]
    const pinnedB = this.pinnedMask[spring.b]

    if (pinnedA && pinnedB) {
      return
    }

    if (!pinnedA && !pinnedB) {
      delta.multiplyScalar(0.5 * correctionScale)
      positionA.add(delta)
      positionB.sub(delta)
      return
    }

    delta.multiplyScalar(correctionScale)
    if (pinnedA) {
      positionB.sub(delta)
    } else {
      positionA.add(delta)
    }
  }

  private syncGeometry(): void {
    const positionAttribute = this.state.geometry.getAttribute('position') as THREE.BufferAttribute

    for (let index = 0; index < this.state.positions.length; index += 1) {
      const position = this.state.positions[index]
      positionAttribute.setXYZ(index, position.x, -position.y, position.z)
    }

    positionAttribute.needsUpdate = true
    this.state.geometry.computeVertexNormals()
    this.state.geometry.computeBoundingSphere()
    this.syncPickGeometry(positionAttribute)
    this.syncWireGeometry(positionAttribute)
  }

  private syncPickGeometry(positionAttribute: THREE.BufferAttribute): void {
    const pointPositionAttribute = this.pickPoints.geometry.getAttribute('position') as THREE.BufferAttribute
    const normalAttribute = this.state.geometry.getAttribute('normal') as THREE.BufferAttribute | undefined

    for (let index = 0; index < this.state.positions.length; index += 1) {
      const positionX = positionAttribute.getX(index)
      const positionY = positionAttribute.getY(index)
      const positionZ = positionAttribute.getZ(index)
      const normalX = normalAttribute ? normalAttribute.getX(index) : 0
      const normalY = normalAttribute ? normalAttribute.getY(index) : 1
      const normalZ = normalAttribute ? normalAttribute.getZ(index) : 0

      pointPositionAttribute.setXYZ(
        index,
        positionX + normalX * VERTEX_SURFACE_OFFSET,
        positionY + normalY * VERTEX_SURFACE_OFFSET,
        positionZ + normalZ * VERTEX_SURFACE_OFFSET,
      )
    }

    pointPositionAttribute.needsUpdate = true
    this.pickPoints.geometry.computeBoundingSphere()
  }

  private syncWireGeometry(positionAttribute: THREE.BufferAttribute): void {
    const wirePositionAttribute = this.wireOverlay.geometry.getAttribute('position') as THREE.BufferAttribute
    const normalAttribute = this.state.geometry.getAttribute('normal') as THREE.BufferAttribute | undefined

    for (let index = 0; index < this.wireEdgePairs.length; index += 1) {
      const vertexIndex = this.wireEdgePairs[index]
      const positionX = positionAttribute.getX(vertexIndex)
      const positionY = positionAttribute.getY(vertexIndex)
      const positionZ = positionAttribute.getZ(vertexIndex)
      const normalX = normalAttribute ? normalAttribute.getX(vertexIndex) : 0
      const normalY = normalAttribute ? normalAttribute.getY(vertexIndex) : 1
      const normalZ = normalAttribute ? normalAttribute.getZ(vertexIndex) : 0

      wirePositionAttribute.setXYZ(
        index,
        positionX + normalX * WIRE_SURFACE_OFFSET,
        positionY + normalY * WIRE_SURFACE_OFFSET,
        positionZ + normalZ * WIRE_SURFACE_OFFSET,
      )
    }

    wirePositionAttribute.needsUpdate = true
    this.wireOverlay.geometry.computeBoundingSphere()
  }

  private applyMaterialStyle(style: CanopyMaterialStyle): void {
    this.mesh.material.color.setHex(style.color)
    this.mesh.material.metalness = style.metalness
    this.mesh.material.roughness = style.roughness
    this.mesh.material.clearcoat = style.clearcoat
    this.mesh.material.clearcoatRoughness = style.clearcoatRoughness
    this.mesh.material.envMapIntensity = style.envMapIntensity
    this.mesh.material.iridescence = style.iridescence
    this.mesh.material.iridescenceIOR = style.iridescenceIOR
    this.mesh.material.iridescenceThicknessRange = [...style.iridescenceThicknessRange]
    this.mesh.material.reflectivity = style.reflectivity
    this.mesh.material.specularIntensity = style.specularIntensity
    this.mesh.material.sheen = style.sheen
    this.mesh.material.sheenRoughness = style.sheenRoughness
    this.mesh.material.sheenColor.setHex(style.sheenColor)
    this.eggIridescenceState.strength = style.eggIridescence
    this.eggIridescenceState.frequency = style.eggIridescenceFrequency
    if (this.eggIridescenceState.uniforms) {
      this.eggIridescenceState.uniforms.uEggIridescence.value = style.eggIridescence
      this.eggIridescenceState.uniforms.uEggIridescenceFrequency.value =
        style.eggIridescenceFrequency
    }
    this.mesh.material.needsUpdate = true
  }

  private installEggIridescenceShader(): void {
    this.mesh.material.customProgramCacheKey = () => 'canopy-egg-iridescence-v1'
    this.mesh.material.onBeforeCompile = (shader) => {
      const uniforms = {
        uEggIridescence: { value: this.eggIridescenceState.strength },
        uEggIridescenceFrequency: { value: this.eggIridescenceState.frequency },
      }
      this.eggIridescenceState.uniforms = uniforms
      shader.uniforms.uEggIridescence = uniforms.uEggIridescence
      shader.uniforms.uEggIridescenceFrequency = uniforms.uEggIridescenceFrequency

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
varying vec3 vEggIriWorldPosition;
varying vec3 vEggIriWorldNormal;`,
        )
        .replace(
          '#include <worldpos_vertex>',
          `#include <worldpos_vertex>
vEggIriWorldPosition = worldPosition.xyz;
vEggIriWorldNormal = normalize( mat3( modelMatrix ) * normal );`,
        )

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
uniform float uEggIridescence;
uniform float uEggIridescenceFrequency;
varying vec3 vEggIriWorldPosition;
varying vec3 vEggIriWorldNormal;

float eggSaturate01(float value) {
  return clamp(value, 0.0, 1.0);
}

float eggHash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}

float eggSmoothNoise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);

  float n000 = eggHash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = eggHash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = eggHash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = eggHash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = eggHash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = eggHash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = eggHash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = eggHash13(i + vec3(1.0, 1.0, 1.0));

  float nx00 = mix(n000, n100, u.x);
  float nx10 = mix(n010, n110, u.x);
  float nx01 = mix(n001, n101, u.x);
  float nx11 = mix(n011, n111, u.x);
  float nxy0 = mix(nx00, nx10, u.y);
  float nxy1 = mix(nx01, nx11, u.y);
  return mix(nxy0, nxy1, u.z);
}

vec3 eggBismuthPalette(float t) {
  t = fract(t);
  vec3 c0 = vec3(1.00, 0.84, 0.20);
  vec3 c1 = vec3(1.00, 0.33, 0.77);
  vec3 c2 = vec3(0.18, 0.93, 1.00);
  vec3 c3 = vec3(0.30, 1.00, 0.46);
  if (t < 0.25) {
    return mix(c0, c1, t * 4.0);
  }
  if (t < 0.50) {
    return mix(c1, c2, (t - 0.25) * 4.0);
  }
  if (t < 0.75) {
    return mix(c2, c3, (t - 0.50) * 4.0);
  }
  return mix(c3, c0, (t - 0.75) * 4.0);
}

vec3 applyEggIridescence(vec3 baseColor) {
  float iriStrength = eggSaturate01(uEggIridescence);
  if (iriStrength <= 0.0001) {
    return baseColor;
  }

  vec3 n = normalize(vEggIriWorldNormal);
  vec3 viewDir = normalize(cameraPosition - vEggIriWorldPosition);
  float ndv = eggSaturate01(dot(n, viewDir));
  float jitter = eggSmoothNoise3(vEggIriWorldPosition * 1.5 + vec3(31.4));
  float broadNoise = eggSmoothNoise3(vEggIriWorldPosition * 0.48 + vec3(11.7));
  float bandFreq = max(0.2, uEggIridescenceFrequency);
  float facetBand =
    (vEggIriWorldPosition.y * 1.8 + vEggIriWorldPosition.x * 0.42 - vEggIriWorldPosition.z * 0.31) * bandFreq;
  float stepBand = (abs(vEggIriWorldPosition.x) + abs(vEggIriWorldPosition.z)) * 0.92;
  float swirl =
    0.5 +
    0.5 *
      sin(
        dot(vEggIriWorldPosition, vec3(0.73, 0.51, -0.46)) * bandFreq * 1.25 +
        broadNoise * 4.6 +
        6.283
      );
  float thicknessT = fract(facetBand * 0.123 + stepBand * 0.081 + swirl * 0.39 + jitter * 0.27 + 5.7);
  float thicknessNm = mix(120.0, 980.0, thicknessT);

  vec3 wavelengths = vec3(680.0, 540.0, 440.0);
  vec3 phase = (4.0 * 3.14159265 * 1.65 * thicknessNm * max(ndv, 0.08)) / wavelengths;
  vec3 interference = 0.5 + 0.5 * cos(phase + vec3(0.0, 2.094, 4.188));

  float hueSweep =
    fract(
      thicknessT * (0.55 + uEggIridescenceFrequency * 0.65) +
      dot(n, vec3(0.23, 0.11, -0.37)) * 0.18
    );
  vec3 oxidePalette = eggBismuthPalette(hueSweep);
  vec3 oxideColor = mix(interference, oxidePalette, 0.68);

  float fresnel = pow(1.0 - ndv, 2.2);
  float filmAmount = iriStrength * (0.48 + 0.52 * fresnel);
  vec3 branchTint = mix(vec3(1.0), baseColor, 0.58);
  vec3 metallicBase = vec3(0.92, 0.94, 0.98) * mix(vec3(1.0), branchTint, 0.26);
  vec3 oxideTinted = mix(oxideColor, oxideColor * branchTint, 0.62);
  vec3 blendTint = mix(metallicBase, oxideTinted, eggSaturate01(filmAmount * 0.78));
  vec3 overlayTint = mix(vec3(1.0), blendTint, 0.62 * iriStrength);
  vec3 iridescentBase = baseColor * overlayTint;
  iridescentBase += oxideColor * fresnel * iriStrength * 0.22;
  return mix(baseColor, iridescentBase, 0.85 * iriStrength);
}`,
        )
        .replace(
          '#include <color_fragment>',
          `#include <color_fragment>
diffuseColor.rgb = applyEggIridescence(diffuseColor.rgb);`,
        )
    }
  }
}

export function buildCanopyFromOutline(
  outline: readonly OutlinePoint[],
  params?: Partial<CanopySimulationParams>,
): CanopySimulation {
  return new CanopySimulation(outline, params)
}

function buildSpringConstraints(
  triangles: readonly TriangleIndices[],
  positions: readonly THREE.Vector3[],
  stiffness: number,
  restLengthScale: number,
): SpringConstraint[] {
  const edgeMap = new Map<string, SpringConstraint>()

  const addTriangleEdges = ([indexA, indexB, indexC]: TriangleIndices): void => {
    addEdge(edgeMap, indexA, indexB, positions, stiffness, restLengthScale)
    addEdge(edgeMap, indexB, indexC, positions, stiffness, restLengthScale)
    addEdge(edgeMap, indexC, indexA, positions, stiffness, restLengthScale)
  }

  triangles.forEach(addTriangleEdges)
  return [...edgeMap.values()]
}

function buildWireEdgePairs(triangles: readonly TriangleIndices[]): number[] {
  const edgeMap = new Map<string, [number, number]>()

  const addEdge = (indexA: number, indexB: number): void => {
    const minIndex = Math.min(indexA, indexB)
    const maxIndex = Math.max(indexA, indexB)
    const key = `${minIndex}:${maxIndex}`

    if (!edgeMap.has(key)) {
      edgeMap.set(key, [indexA, indexB])
    }
  }

  for (const [indexA, indexB, indexC] of triangles) {
    addEdge(indexA, indexB)
    addEdge(indexB, indexC)
    addEdge(indexC, indexA)
  }

  return [...edgeMap.values()].flat()
}

function addEdge(
  edgeMap: Map<string, SpringConstraint>,
  indexA: number,
  indexB: number,
  positions: readonly THREE.Vector3[],
  stiffness: number,
  restLengthScale: number,
): void {
  const edgeKey = indexA < indexB ? `${indexA}:${indexB}` : `${indexB}:${indexA}`
  if (edgeMap.has(edgeKey)) {
    return
  }

  const baseLength = positions[indexA].distanceTo(positions[indexB])
  edgeMap.set(edgeKey, {
    a: indexA,
    b: indexB,
    baseLength,
    restLength: baseLength * restLengthScale,
    stiffness,
  })
}

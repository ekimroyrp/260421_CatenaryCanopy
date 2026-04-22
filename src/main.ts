import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js'

import {
  cloneOutlinePoints,
  createEditableOutline,
  type EditableOutline,
  type OutlinePoint,
  validateOutline,
} from './geometry'
import {
  buildCanopyFromOutline,
  type CanopySimulation,
} from './catenarySimulation'
import { InfiniteFadingGrid } from './infiniteGrid'

interface PendingHandleClick {
  pointerId: number
  clientX: number
  clientY: number
  type: 'outline' | 'anchor' | 'vertex'
  pointId?: number
  anchorIndex?: number
  canClose?: boolean
}

interface AnchorSnapshot {
  position: THREE.Vector3
}

document.title = '260421_CatenaryCanopy'

const app = document.querySelector<HTMLDivElement>('#app') ?? (() => {
  throw new Error('App root was not found.')
})()

app.innerHTML = `
  <div class="app-shell">
    <canvas class="viewport" aria-label="Inflation canopy viewport"></canvas>
    <section id="ui-panel" class="apple-panel" aria-label="Inflation canopy controls">
      <div id="ui-handle" class="panel-drag-handle">
        <button
          id="collapseToggle"
          class="collapse-button panel-collapse-toggle"
          type="button"
          aria-label="Collapse controls"
          aria-expanded="true"
        >
          <span class="collapse-icon" aria-hidden="true"></span>
        </button>
      </div>
      <div class="ui-body panel-sections">
        <div class="control-hint">Wheel = Zoom, MMB = Pan, RMB = Orbit</div>
        <div id="statusText" class="control-status"></div>
        <section class="panel-section">
          <button class="panel-section-header" type="button" aria-expanded="true">
            <span class="panel-section-label">Simulation</span>
          </button>
          <div class="panel-section-content panel-controls-stack">
            <div class="control control-grid-2">
              <button id="startButton" class="pill-button action-button is-start-state" type="button">Start</button>
              <button id="resetButton" class="pill-button reset-button" type="button">Reset</button>
            </div>
            <label class="control" for="pressureSlider">
              <div class="control-row">
                <span>Pressure</span>
                <span id="pressure-value" class="value-pill">56.55</span>
              </div>
              <input id="pressureSlider" type="range" min="0" max="100" value="56.55" step="0.01" />
            </label>
            <label class="control" for="crownBiasSlider">
              <div class="control-row">
                <span>Crown Bias</span>
                <span id="crown-bias-value" class="value-pill">4.00</span>
              </div>
              <input id="crownBiasSlider" type="range" min="0" max="4" value="4" step="0.01" />
            </label>
            <label class="control" for="pressureScaleSlider">
              <div class="control-row">
                <span>Pressure Scale</span>
                <span id="pressure-scale-value" class="value-pill">26.0</span>
              </div>
              <input id="pressureScaleSlider" type="range" min="0" max="200" value="26" step="0.1" />
            </label>
            <label class="control" for="pressureResponseSlider">
              <div class="control-row">
                <span>Pressure Response</span>
                <span id="pressure-response-value" class="value-pill">1.90</span>
              </div>
              <input id="pressureResponseSlider" type="range" min="0.1" max="20" value="1.9" step="0.1" />
            </label>
            <label class="control" for="dampingSlider">
              <div class="control-row">
                <span>Damping</span>
                <span id="damping-value" class="value-pill">4.80</span>
              </div>
              <input id="dampingSlider" type="range" min="0" max="40" value="4.8" step="0.1" />
            </label>
            <label class="control" for="substepsSlider">
              <div class="control-row">
                <span>Substeps</span>
                <span id="substeps-value" class="value-pill">5</span>
              </div>
              <input id="substepsSlider" type="range" min="1" max="20" value="5" step="1" />
            </label>
            <label class="control" for="constraintIterationsSlider">
              <div class="control-row">
                <span>Constraint Iterations</span>
                <span id="constraint-iterations-value" class="value-pill">10</span>
              </div>
              <input id="constraintIterationsSlider" type="range" min="1" max="60" value="10" step="1" />
            </label>
            <label class="control" for="stiffnessSlider">
              <div class="control-row">
                <span>Stiffness</span>
                <span id="stiffness-value" class="value-pill">0.19</span>
              </div>
              <input id="stiffnessSlider" type="range" min="0" max="2" value="0.19" step="0.01" />
            </label>
            <label class="control" for="maxDeltaTimeSlider">
              <div class="control-row">
                <span>Max Delta Time</span>
                <span id="max-delta-time-value" class="value-pill">0.0320 s</span>
              </div>
              <input id="maxDeltaTimeSlider" type="range" min="0.004" max="0.2" value="0.032" step="0.001" />
            </label>
            <label class="control" for="subdivisionLevelSlider">
              <div class="control-row">
                <span>Subdivision Level</span>
                <span id="subdivision-level-value" class="value-pill">1</span>
              </div>
              <input id="subdivisionLevelSlider" type="range" min="0" max="4" value="1" step="1" />
            </label>
            <label class="control" for="meshDensitySlider">
              <div class="control-row">
                <span>Mesh Density</span>
                <span id="mesh-density-value" class="value-pill">1.00x</span>
              </div>
              <input id="meshDensitySlider" type="range" min="0.25" max="4" value="1" step="0.05" />
            </label>
          </div>
        </section>
        <section class="panel-section">
          <button class="panel-section-header" type="button" aria-expanded="true">
            <span class="panel-section-label">Anchors</span>
          </button>
          <div class="panel-section-content panel-controls-stack">
            <div class="control-hint">
              Outline corners start as anchors.<br />
              LMB Mesh Vert = Add Anchor<br />
              LMB+Drag Anchor = Raise or Lower
            </div>
            <div class="control">
              <div class="control-row">
                <span>Anchors</span>
                <span id="anchor-count-value" class="value-pill">0</span>
              </div>
            </div>
          </div>
        </section>
        <section class="panel-section">
          <button class="panel-section-header" type="button" aria-expanded="true">
            <span class="panel-section-label">Display</span>
          </button>
          <div class="panel-section-content panel-controls-stack">
            <label class="toggle-control" for="baseGridToggle">
              <span>Base Grid</span>
              <input id="baseGridToggle" type="checkbox" checked />
            </label>
            <label class="toggle-control" for="wireToggle">
              <span>Mesh Wires</span>
              <input id="wireToggle" type="checkbox" checked />
            </label>
            <label class="toggle-control" for="reflectionToggle">
              <span>Foil Material</span>
              <input id="reflectionToggle" type="checkbox" checked />
            </label>
          </div>
        </section>
        <section class="panel-section">
          <button class="panel-section-header" type="button" aria-expanded="true">
            <span class="panel-section-label">Export</span>
          </button>
          <div class="panel-section-content panel-controls-stack">
            <div class="control">
              <button id="exportObjButton" class="pill-button control-button-wide" type="button">Export OBJ</button>
            </div>
            <div class="control">
              <button id="exportGlbButton" class="pill-button control-button-wide" type="button">Export GLB</button>
            </div>
            <div class="control">
              <button id="exportScreenshotButton" class="pill-button control-button-wide" type="button">Export Screenshot</button>
            </div>
          </div>
        </section>
      </div>
      <div id="ui-handle-bottom"></div>
    </section>
  </div>
`

function requireElement<T extends Element>(selector: string): T {
  const element = app.querySelector<T>(selector)
  if (!element) {
    throw new Error(`Missing UI element: ${selector}`)
  }

  return element
}

function addWrappedGlow(
  context: CanvasRenderingContext2D,
  width: number,
  x: number,
  y: number,
  radius: number,
  stops: readonly [number, string][],
): void {
  for (const offset of [-width, 0, width]) {
    const gradient = context.createRadialGradient(x + offset, y, 0, x + offset, y, radius)
    for (const [position, color] of stops) {
      gradient.addColorStop(position, color)
    }

    context.fillStyle = gradient
    context.fillRect(x + offset - radius, y - radius, radius * 2, radius * 2)
  }
}

function createStudioReflectionEnvironment(renderer: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Could not create environment canvas context.')
  }

  const width = canvas.width
  const height = canvas.height
  const baseGradient = context.createLinearGradient(0, 0, 0, height)
  baseGradient.addColorStop(0, '#172241')
  baseGradient.addColorStop(0.24, '#35538b')
  baseGradient.addColorStop(0.52, '#9aa8e2')
  baseGradient.addColorStop(0.76, '#ebf1ff')
  baseGradient.addColorStop(1, '#c8f3ff')
  context.fillStyle = baseGradient
  context.fillRect(0, 0, width, height)

  addWrappedGlow(context, width, width * 0.18, height * 0.5, width * 0.24, [
    [0, 'rgba(255, 92, 223, 0.62)'],
    [0.42, 'rgba(255, 92, 223, 0.18)'],
    [1, 'rgba(255, 92, 223, 0)'],
  ])

  addWrappedGlow(context, width, width * 0.82, height * 0.52, width * 0.24, [
    [0, 'rgba(255, 207, 103, 0.82)'],
    [0.4, 'rgba(255, 207, 103, 0.24)'],
    [1, 'rgba(255, 207, 103, 0)'],
  ])

  addWrappedGlow(context, width, width * 0.5, height * 0.84, width * 0.34, [
    [0, 'rgba(79, 230, 255, 0.72)'],
    [0.38, 'rgba(79, 230, 255, 0.24)'],
    [1, 'rgba(79, 230, 255, 0)'],
  ])

  addWrappedGlow(context, width, width * 0.5, height * 0.2, width * 0.26, [
    [0, 'rgba(255, 255, 255, 0.82)'],
    [0.48, 'rgba(255, 255, 255, 0.18)'],
    [1, 'rgba(255, 255, 255, 0)'],
  ])

  addWrappedGlow(context, width, width * 0.58, height * 0.58, width * 0.18, [
    [0, 'rgba(255, 255, 255, 0.34)'],
    [0.55, 'rgba(255, 255, 255, 0.08)'],
    [1, 'rgba(255, 255, 255, 0)'],
  ])

  const environmentTexture = new THREE.CanvasTexture(canvas)
  environmentTexture.colorSpace = THREE.SRGBColorSpace
  environmentTexture.mapping = THREE.EquirectangularReflectionMapping

  const environmentTarget = pmremGenerator.fromEquirectangular(environmentTexture)
  environmentTexture.dispose()
  pmremGenerator.dispose()
  return environmentTarget
}

const canvas = requireElement<HTMLCanvasElement>('.viewport')
const uiPanel = requireElement<HTMLDivElement>('#ui-panel')
const uiHandleTop = requireElement<HTMLDivElement>('#ui-handle')
const uiHandleBottom = requireElement<HTMLDivElement>('#ui-handle-bottom')
const collapseToggle = requireElement<HTMLButtonElement>('#collapseToggle')
const statusText = requireElement<HTMLDivElement>('#statusText')
const startButton = requireElement<HTMLButtonElement>('#startButton')
const resetButton = requireElement<HTMLButtonElement>('#resetButton')
const exportObjButton = requireElement<HTMLButtonElement>('#exportObjButton')
const exportGlbButton = requireElement<HTMLButtonElement>('#exportGlbButton')
const exportScreenshotButton = requireElement<HTMLButtonElement>('#exportScreenshotButton')
const pressureSlider = requireElement<HTMLInputElement>('#pressureSlider')
const pressureValue = requireElement<HTMLSpanElement>('#pressure-value')
const crownBiasSlider = requireElement<HTMLInputElement>('#crownBiasSlider')
const crownBiasValue = requireElement<HTMLSpanElement>('#crown-bias-value')
const pressureScaleSlider = requireElement<HTMLInputElement>('#pressureScaleSlider')
const pressureScaleValue = requireElement<HTMLSpanElement>('#pressure-scale-value')
const pressureResponseSlider = requireElement<HTMLInputElement>('#pressureResponseSlider')
const pressureResponseValue = requireElement<HTMLSpanElement>('#pressure-response-value')
const dampingSlider = requireElement<HTMLInputElement>('#dampingSlider')
const dampingValue = requireElement<HTMLSpanElement>('#damping-value')
const substepsSlider = requireElement<HTMLInputElement>('#substepsSlider')
const substepsValue = requireElement<HTMLSpanElement>('#substeps-value')
const constraintIterationsSlider = requireElement<HTMLInputElement>('#constraintIterationsSlider')
const constraintIterationsValue = requireElement<HTMLSpanElement>('#constraint-iterations-value')
const stiffnessSlider = requireElement<HTMLInputElement>('#stiffnessSlider')
const stiffnessValue = requireElement<HTMLSpanElement>('#stiffness-value')
const maxDeltaTimeSlider = requireElement<HTMLInputElement>('#maxDeltaTimeSlider')
const maxDeltaTimeValue = requireElement<HTMLSpanElement>('#max-delta-time-value')
const subdivisionLevelSlider = requireElement<HTMLInputElement>('#subdivisionLevelSlider')
const subdivisionLevelValue = requireElement<HTMLSpanElement>('#subdivision-level-value')
const meshDensitySlider = requireElement<HTMLInputElement>('#meshDensitySlider')
const meshDensityValue = requireElement<HTMLSpanElement>('#mesh-density-value')
const anchorCountValue = requireElement<HTMLSpanElement>('#anchor-count-value')
const baseGridToggle = requireElement<HTMLInputElement>('#baseGridToggle')
const wireToggle = requireElement<HTMLInputElement>('#wireToggle')
const reflectionToggle = requireElement<HTMLInputElement>('#reflectionToggle')

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
  preserveDrawingBuffer: true,
})
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.18
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)
const reflectionEnvironment = createStudioReflectionEnvironment(renderer)
scene.environment = reflectionEnvironment.texture

const REFLECTION_ACCENT_INTENSITIES = {
  magenta: 6.2,
  cyan: 7.8,
  amber: 6.9,
} as const

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200)
camera.position.set(8.5, 7.2, 8.5)

const groundGrid = new InfiniteFadingGrid({
  width: 200,
  height: 200,
  sectionSize: 5,
  sectionThickness: 1.02,
  cellSize: 1,
  cellThickness: 0.46,
  cellColor: '#656b71',
  sectionColor: '#52585f',
  fadeDistance: 140,
  fadeStrength: 1.35,
  infiniteGrid: true,
  followCamera: true,
  y: 0.001,
  opacity: 0.9,
})
scene.add(groundGrid.mesh)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 0.3, 0)
controls.minDistance = 3
controls.maxDistance = 120
controls.maxPolarAngle = Math.PI - 0.01
controls.mouseButtons.LEFT = -1 as THREE.MOUSE
controls.mouseButtons.MIDDLE = THREE.MOUSE.PAN
controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE

const ambientLight = new THREE.HemisphereLight(0xf9fbff, 0x8b96a4, 1.2)
scene.add(ambientLight)

const keyLight = new THREE.DirectionalLight(0xffffff, 1.5)
keyLight.position.set(6, 11, 4)
keyLight.castShadow = true
keyLight.shadow.mapSize.set(2048, 2048)
keyLight.shadow.bias = -0.00015
keyLight.shadow.normalBias = 0.045
keyLight.shadow.camera.near = 0.5
keyLight.shadow.camera.far = 40
keyLight.shadow.camera.left = -12
keyLight.shadow.camera.right = 12
keyLight.shadow.camera.top = 12
keyLight.shadow.camera.bottom = -12
scene.add(keyLight)

const fillLight = new THREE.DirectionalLight(0xd7ebff, 0.55)
fillLight.position.set(-9, 6, -8)
scene.add(fillLight)

const magentaAccentLight = new THREE.PointLight(
  0xff4cc8,
  REFLECTION_ACCENT_INTENSITIES.magenta,
  30,
  2,
)
magentaAccentLight.position.set(-7.5, 4.5, 4.8)
scene.add(magentaAccentLight)

const cyanAccentLight = new THREE.PointLight(
  0x4fe6ff,
  REFLECTION_ACCENT_INTENSITIES.cyan,
  28,
  2,
)
cyanAccentLight.position.set(6.5, 2.4, 7.5)
scene.add(cyanAccentLight)

const amberAccentLight = new THREE.PointLight(
  0xffc857,
  REFLECTION_ACCENT_INTENSITIES.amber,
  28,
  2,
)
amberAccentLight.position.set(7.8, 5.2, -4.8)
scene.add(amberAccentLight)

const outlineGroup = new THREE.Group()
outlineGroup.position.y = 0.02
scene.add(outlineGroup)

const outlineHandleGroup = new THREE.Group()
scene.add(outlineHandleGroup)

const anchorHandleGroup = new THREE.Group()
scene.add(anchorHandleGroup)

const outlineHandleGeometry = new THREE.CylinderGeometry(0.11, 0.11, 0.08, 20)
const anchorHandleGeometry = new THREE.SphereGeometry(0.12, 16, 12)

const outlineHandleMaterial = new THREE.MeshStandardMaterial({
  color: 0xf3f7fb,
  roughness: 0.35,
  metalness: 0.02,
})
const outlineCloseMaterial = new THREE.MeshStandardMaterial({
  color: 0xffd47a,
  roughness: 0.32,
  metalness: 0.04,
})
const anchorHandleMaterial = new THREE.MeshStandardMaterial({
  color: 0xffd47a,
  roughness: 0.28,
  metalness: 0.06,
})

const outlineLineMaterial = new THREE.LineBasicMaterial({ color: 0xf3f7fb })
const invalidOutlineLineMaterial = new THREE.LineBasicMaterial({ color: 0xe05a78 })

const raycaster = new THREE.Raycaster()
raycaster.params.Points.threshold = 0.18
const drawPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
const anchorDragPlane = new THREE.Plane()
const pointer = new THREE.Vector2()
const hitPoint = new THREE.Vector3()
const clock = new THREE.Clock()

const CLICK_DRAG_THRESHOLD = 6
const MIN_OUTLINE_SEGMENT_LENGTH = 0.06
const EXPORT_BASE_NAME = '260421_CatenaryCanopy'
const FIXED_SIMULATION_STEP = 1 / 60
const MAX_SIMULATION_STEPS_PER_FRAME = 8
const panelDragOffset = { x: 0, y: 0 }
const exportCounters = {
  obj: 0,
  glb: 0,
  png: 0,
}

let nextPointId = 1
let outline: EditableOutline = createEditableOutline()
let simulation: CanopySimulation | null = null
let outlineLine: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial> | null = null
let solverRunning = false
let simulationAccumulator = 0
let draggingPanel = false
let pendingHandleClick: PendingHandleClick | null = null
let draggingOutlinePointId: number | null = null
let draggingAnchorIndex: number | null = null
let showBaseGrid = baseGridToggle.checked
let showWireframe = wireToggle.checked
let reflectionsEnabled = reflectionToggle.checked

function updatePointer(clientX: number, clientY: number): void {
  const rect = renderer.domElement.getBoundingClientRect()
  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1
}

function getGroundIntersection(clientX: number, clientY: number): THREE.Vector3 | null {
  updatePointer(clientX, clientY)
  raycaster.setFromCamera(pointer, camera)
  return raycaster.ray.intersectPlane(drawPlane, hitPoint) ? hitPoint.clone() : null
}

function toGroundVector(point: THREE.Vector3): THREE.Vector2 {
  return new THREE.Vector2(point.x, point.z)
}

function createPoint(position: THREE.Vector3): OutlinePoint {
  return {
    id: nextPointId++,
    position: toGroundVector(position),
  }
}

function updateOutlineValidation(closed = outline.closed): void {
  const validation = validateOutline(outline.points, closed)
  outline.valid = validation.valid
  outline.error = validation.error
}

function rebuildOutlineVisuals(): void {
  if (outlineLine) {
    outlineGroup.remove(outlineLine)
    outlineLine.geometry.dispose()
    outlineLine = null
  }

  outlineHandleGroup.clear()
  updateOutlineValidation()

  if (outline.points.length >= 2) {
    const vectors: THREE.Vector3[] = []
    for (const point of outline.points) {
      vectors.push(new THREE.Vector3(point.position.x, 0, point.position.y))
    }

    if (outline.closed && outline.points.length >= 3) {
      vectors.push(new THREE.Vector3(outline.points[0].position.x, 0, outline.points[0].position.y))
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(vectors)
    const material =
      outline.closed || outline.points.length >= 3
        ? outline.valid
          ? outlineLineMaterial
          : invalidOutlineLineMaterial
        : outlineLineMaterial
    outlineLine = new THREE.Line(geometry, material)
    outlineGroup.add(outlineLine)
  }

  if (simulation) {
    return
  }

  const firstPointId = outline.points[0]?.id ?? null
  for (const point of outline.points) {
    const isCloseHandle =
      !outline.closed &&
      point.id === firstPointId &&
      outline.points.length >= 3 &&
      validateOutline(outline.points, true).valid

    const handle = new THREE.Mesh(
      outlineHandleGeometry,
      isCloseHandle ? outlineCloseMaterial : outlineHandleMaterial,
    )
    handle.position.set(point.position.x, 0.05, point.position.y)
    handle.userData.pointId = point.id
    outlineHandleGroup.add(handle)
  }
}

function rebuildAnchorHandles(): void {
  anchorHandleGroup.clear()
  if (!simulation) {
    return
  }

  for (const anchor of simulation.getAnchorVertices()) {
    const handle = new THREE.Mesh(anchorHandleGeometry, anchorHandleMaterial)
    handle.position.copy(anchor.position)
    handle.userData.anchorIndex = anchor.index
    anchorHandleGroup.add(handle)
  }
}

function pickOutlineHandle(clientX: number, clientY: number): THREE.Intersection<THREE.Object3D> | null {
  if (outlineHandleGroup.children.length === 0) {
    return null
  }

  updatePointer(clientX, clientY)
  raycaster.setFromCamera(pointer, camera)
  return raycaster.intersectObjects(outlineHandleGroup.children, false)[0] ?? null
}

function pickAnchorHandle(clientX: number, clientY: number): THREE.Intersection<THREE.Object3D> | null {
  if (anchorHandleGroup.children.length === 0) {
    return null
  }

  updatePointer(clientX, clientY)
  raycaster.setFromCamera(pointer, camera)
  return raycaster.intersectObjects(anchorHandleGroup.children, false)[0] ?? null
}

function pickMeshVertex(clientX: number, clientY: number): number | null {
  if (!simulation) {
    return null
  }

  updatePointer(clientX, clientY)
  raycaster.setFromCamera(pointer, camera)
  const hit = raycaster.intersectObject(simulation.vertexDots, false)[0]
  return typeof hit?.index === 'number' ? hit.index : null
}

function readSliderNumber(input: HTMLInputElement, fallback: number): number {
  const value = Number.parseFloat(input.value)
  return Number.isFinite(value) ? value : fallback
}

function captureAnchorSnapshots(): AnchorSnapshot[] {
  return simulation?.getAnchorVertices().map((anchor) => ({
    position: anchor.position.clone(),
  })) ?? []
}

function findNearestFlatVertexIndex(
  targetPosition: THREE.Vector3,
  usedIndices: ReadonlySet<number>,
): number {
  if (!simulation) {
    return -1
  }

  let nearestIndex = -1
  let nearestDistanceSquared = Number.POSITIVE_INFINITY

  for (let index = 0; index < simulation.flatMesh.vertices.length; index += 1) {
    if (usedIndices.has(index)) {
      continue
    }

    const vertex = simulation.flatMesh.vertices[index]
    const deltaX = vertex.x - targetPosition.x
    const deltaZ = vertex.y - targetPosition.z
    const distanceSquared = deltaX * deltaX + deltaZ * deltaZ

    if (distanceSquared < nearestDistanceSquared) {
      nearestDistanceSquared = distanceSquared
      nearestIndex = index
    }
  }

  return nearestIndex
}

function getPressureValue(): number {
  return readSliderNumber(pressureSlider, 56.55)
}

function getCrownBiasValue(): number {
  return readSliderNumber(crownBiasSlider, 4)
}

function getPressureScaleValue(): number {
  return readSliderNumber(pressureScaleSlider, 26)
}

function getPressureResponseValue(): number {
  return readSliderNumber(pressureResponseSlider, 1.9)
}

function getDampingValue(): number {
  return readSliderNumber(dampingSlider, 4.8)
}

function getSubstepsValue(): number {
  return Math.max(1, Math.round(readSliderNumber(substepsSlider, 5)))
}

function getConstraintIterationsValue(): number {
  return Math.max(1, Math.round(readSliderNumber(constraintIterationsSlider, 10)))
}

function getStiffnessValue(): number {
  return readSliderNumber(stiffnessSlider, 0.19)
}

function getMaxDeltaTimeValue(): number {
  return readSliderNumber(maxDeltaTimeSlider, 0.032)
}

function getSubdivisionLevelValue(): number {
  return Math.max(0, Math.round(readSliderNumber(subdivisionLevelSlider, 1)))
}

function getMeshDensityValue(): number {
  return readSliderNumber(meshDensitySlider, 1)
}

function getSimulationBuildParams() {
  return {
    pressure: getPressureValue(),
    crownBias: getCrownBiasValue(),
    pressureScale: getPressureScaleValue(),
    pressureResponse: getPressureResponseValue(),
    damping: getDampingValue(),
    substeps: getSubstepsValue(),
    constraintIterations: getConstraintIterationsValue(),
    stiffness: getStiffnessValue(),
    maxDeltaTime: getMaxDeltaTimeValue(),
    displaySubdivisionLevel: getSubdivisionLevelValue(),
    meshDensity: getMeshDensityValue(),
  }
}

function updateRangeProgress(input: HTMLInputElement): void {
  const min = Number.parseFloat(input.min || '0')
  const max = Number.parseFloat(input.max || '1')
  const value = Number.parseFloat(input.value || '0')
  const progress = max <= min ? 0 : ((value - min) / (max - min)) * 100
  input.style.setProperty('--range-progress', `${THREE.MathUtils.clamp(progress, 0, 100)}%`)
}

function addOutlinePoint(point: THREE.Vector3): void {
  const nextPoint = createPoint(point)
  const lastPoint = outline.points[outline.points.length - 1]
  if (lastPoint && lastPoint.position.distanceTo(nextPoint.position) < MIN_OUTLINE_SEGMENT_LENGTH) {
    return
  }

  outline.points = [...outline.points, nextPoint]
  outline.closed = false
  rebuildOutlineVisuals()
  refreshUiState()
}

function updateOutlinePoint(pointId: number, point: THREE.Vector3): void {
  outline.points = outline.points.map((outlinePoint) =>
    outlinePoint.id === pointId
      ? {
          ...outlinePoint,
          position: toGroundVector(point),
        }
      : outlinePoint,
  )

  rebuildOutlineVisuals()
  refreshUiState()
}

function buildSimulation(preserveAnchorHeights = false): void {
  const previousAnchorSnapshots = preserveAnchorHeights ? captureAnchorSnapshots() : []
  disposeSimulation()
  simulation = buildCanopyFromOutline(cloneOutlinePoints(outline.points), getSimulationBuildParams())
  simulationAccumulator = 0
  simulation.setWireframeVisible(showWireframe)
  simulation.setReflectionEnabled(reflectionsEnabled)
  scene.add(simulation.mesh)
  if (previousAnchorSnapshots.length > 0) {
    const usedIndices = new Set<number>()
    for (const snapshot of previousAnchorSnapshots) {
      const nearestIndex = findNearestFlatVertexIndex(snapshot.position, usedIndices)
      if (nearestIndex < 0) {
        continue
      }

      usedIndices.add(nearestIndex)
      simulation.ensurePinnedVertex(nearestIndex, snapshot.position.y)
    }
  }
  rebuildOutlineVisuals()
  rebuildAnchorHandles()
}

function closeOutline(): void {
  const validation = validateOutline(outline.points, true)
  if (!validation.valid) {
    outline.valid = false
    outline.error = validation.error
    rebuildOutlineVisuals()
    refreshUiState()
    return
  }

  outline.closed = true
  outline.valid = true
  outline.error = 'Mesh generated. Press Start to inflate.'
  buildSimulation()
  solverRunning = false
  refreshUiState()
}

function disposeSimulation(): void {
  if (!simulation) {
    return
  }

  simulationAccumulator = 0
  scene.remove(simulation.mesh)
  simulation.dispose()
  simulation = null
  rebuildOutlineVisuals()
  rebuildAnchorHandles()
}

function resetSimulationState(): void {
  if (!simulation) {
    return
  }

  solverRunning = false
  simulationAccumulator = 0
  pendingHandleClick = null
  draggingOutlinePointId = null
  draggingAnchorIndex = null
  simulation.reset()
  rebuildAnchorHandles()
  refreshUiState()
}

function updatePressureLabel(): void {
  pressureValue.textContent = getPressureValue().toFixed(2)
  updateRangeProgress(pressureSlider)
}

function updateCrownBiasLabel(): void {
  crownBiasValue.textContent = getCrownBiasValue().toFixed(2)
  updateRangeProgress(crownBiasSlider)
}

function updatePressureScaleLabel(): void {
  pressureScaleValue.textContent = getPressureScaleValue().toFixed(1)
  updateRangeProgress(pressureScaleSlider)
}

function updatePressureResponseLabel(): void {
  pressureResponseValue.textContent = getPressureResponseValue().toFixed(2)
  updateRangeProgress(pressureResponseSlider)
}

function updateDampingLabel(): void {
  dampingValue.textContent = getDampingValue().toFixed(2)
  updateRangeProgress(dampingSlider)
}

function updateSubstepsLabel(): void {
  substepsValue.textContent = `${getSubstepsValue()}`
  updateRangeProgress(substepsSlider)
}

function updateConstraintIterationsLabel(): void {
  constraintIterationsValue.textContent = `${getConstraintIterationsValue()}`
  updateRangeProgress(constraintIterationsSlider)
}

function updateStiffnessLabel(): void {
  stiffnessValue.textContent = getStiffnessValue().toFixed(2)
  updateRangeProgress(stiffnessSlider)
}

function updateMaxDeltaTimeLabel(): void {
  maxDeltaTimeValue.textContent = `${getMaxDeltaTimeValue().toFixed(4)} s`
  updateRangeProgress(maxDeltaTimeSlider)
}

function updateSubdivisionLevelLabel(): void {
  subdivisionLevelValue.textContent = `${getSubdivisionLevelValue()}`
  updateRangeProgress(subdivisionLevelSlider)
}

function updateMeshDensityLabel(): void {
  meshDensityValue.textContent = `${getMeshDensityValue().toFixed(2)}x`
  updateRangeProgress(meshDensitySlider)
}

function refreshUiState(): void {
  updatePressureLabel()
  updateCrownBiasLabel()
  updatePressureScaleLabel()
  updatePressureResponseLabel()
  updateDampingLabel()
  updateSubstepsLabel()
  updateConstraintIterationsLabel()
  updateStiffnessLabel()
  updateMaxDeltaTimeLabel()
  updateSubdivisionLevelLabel()
  updateMeshDensityLabel()

  const anchorCount = simulation?.getPinnedCount() ?? 0
  anchorCountValue.textContent = `${anchorCount}`

  const hasSimulation = simulation !== null
  startButton.textContent = solverRunning ? 'Pause' : 'Start'
  startButton.classList.toggle('is-start-state', !solverRunning)
  startButton.classList.toggle('is-stop-state', solverRunning)
  startButton.disabled = !hasSimulation || anchorCount === 0
  exportObjButton.disabled = !hasSimulation
  exportGlbButton.disabled = !hasSimulation
  exportScreenshotButton.disabled = !hasSimulation

  if (!hasSimulation) {
    statusText.textContent = outline.error
    return
  }

  if (solverRunning) {
    statusText.textContent = 'Inflating. Click mesh verts to add anchors, or drag an anchor vertically.'
    return
  }

  statusText.textContent =
    'Corners start anchored. Click mesh verts to add more anchors, then drag any anchor to change height.'
}

function applyDisplayVisibilityState(): void {
  groundGrid.mesh.visible = showBaseGrid
  simulation?.setWireframeVisible(showWireframe)
}

function applyReflectionState(): void {
  scene.environment = reflectionsEnabled ? reflectionEnvironment.texture : null
  magentaAccentLight.intensity = reflectionsEnabled ? REFLECTION_ACCENT_INTENSITIES.magenta : 0
  cyanAccentLight.intensity = reflectionsEnabled ? REFLECTION_ACCENT_INTENSITIES.cyan : 0
  amberAccentLight.intensity = reflectionsEnabled ? REFLECTION_ACCENT_INTENSITIES.amber : 0
  simulation?.setReflectionEnabled(reflectionsEnabled)
}

function beginAnchorDrag(anchorIndex: number): void {
  if (!simulation) {
    return
  }

  const anchorPosition = simulation.getDisplayVertexPosition(anchorIndex)
  const cameraDirection = camera.getWorldDirection(new THREE.Vector3())
  const horizontalDirection = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z)
  if (horizontalDirection.lengthSq() < 1e-6) {
    horizontalDirection.set(1, 0, 0)
  }
  horizontalDirection.normalize()

  const planeNormal = new THREE.Vector3()
    .crossVectors(horizontalDirection, new THREE.Vector3(0, 1, 0))
    .normalize()
  anchorDragPlane.setFromNormalAndCoplanarPoint(planeNormal, anchorPosition)
}

function toggleSolver(): void {
  if (!simulation || simulation.getPinnedCount() === 0) {
    return
  }

  solverRunning = !solverRunning
  simulationAccumulator = 0
  refreshUiState()
}

function downloadBlob(blob: Blob, filename: string): void {
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 0)
}

function nextExportName(type: 'obj' | 'glb' | 'png'): string {
  exportCounters[type] += 1
  const serial = String(exportCounters[type]).padStart(3, '0')
  return `${EXPORT_BASE_NAME}_${serial}.${type}`
}

function getExportSourceMeshes(): THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[] {
  return simulation ? [simulation.mesh] : []
}

function getPrimaryMaterialColor(material: THREE.Material | THREE.Material[]): THREE.Color {
  const primary = Array.isArray(material) ? material[0] : material
  const colorCarrier = primary as THREE.Material & { color?: THREE.Color }
  return colorCarrier.color?.clone() ?? new THREE.Color(0xc2d5f2)
}

function buildExportMeshes(): THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>[] {
  const sourceMeshes = getExportSourceMeshes()

  return sourceMeshes.map((sourceMesh, index) => {
    sourceMesh.updateWorldMatrix(true, false)
    const exportGeometry = sourceMesh.geometry.clone()
    exportGeometry.applyMatrix4(sourceMesh.matrixWorld)
    exportGeometry.computeVertexNormals()

    const exportMaterial = new THREE.MeshStandardMaterial({
      color: getPrimaryMaterialColor(sourceMesh.material),
      side: THREE.DoubleSide,
      roughness: 0.45,
      metalness: 0.05,
    })

    const exportMesh = new THREE.Mesh(exportGeometry, exportMaterial)
    exportMesh.name = `${EXPORT_BASE_NAME}_${String(index + 1).padStart(2, '0')}`
    return exportMesh
  })
}

function disposeExportMeshes(meshes: readonly THREE.Mesh<THREE.BufferGeometry, THREE.Material>[]): void {
  for (const mesh of meshes) {
    mesh.geometry.dispose()
    mesh.material.dispose()
  }
}

function exportObj(): void {
  const exportMeshes = buildExportMeshes()
  if (exportMeshes.length === 0) {
    return
  }

  let output = `# ${EXPORT_BASE_NAME} OBJ Export\n`
  let vertexOffset = 0

  for (const mesh of exportMeshes) {
    const geometry = mesh.geometry
    const position = geometry.getAttribute('position') as THREE.BufferAttribute
    const normal = geometry.getAttribute('normal') as THREE.BufferAttribute | undefined
    const index = geometry.getIndex()

    output += `o ${mesh.name}\n`

    for (let vertexIndex = 0; vertexIndex < position.count; vertexIndex += 1) {
      output += `v ${position.getX(vertexIndex)} ${position.getY(vertexIndex)} ${position.getZ(vertexIndex)}\n`
    }

    if (normal) {
      for (let normalIndex = 0; normalIndex < normal.count; normalIndex += 1) {
        output += `vn ${normal.getX(normalIndex)} ${normal.getY(normalIndex)} ${normal.getZ(normalIndex)}\n`
      }
    }

    if (index) {
      for (let faceIndex = 0; faceIndex < index.count; faceIndex += 3) {
        const a = vertexOffset + index.getX(faceIndex) + 1
        const b = vertexOffset + index.getX(faceIndex + 1) + 1
        const c = vertexOffset + index.getX(faceIndex + 2) + 1
        output += normal
          ? `f ${a}//${a} ${b}//${b} ${c}//${c}\n`
          : `f ${a} ${b} ${c}\n`
      }
    } else {
      for (let faceIndex = 0; faceIndex < position.count; faceIndex += 3) {
        const a = vertexOffset + faceIndex + 1
        const b = vertexOffset + faceIndex + 2
        const c = vertexOffset + faceIndex + 3
        output += normal
          ? `f ${a}//${a} ${b}//${b} ${c}//${c}\n`
          : `f ${a} ${b} ${c}\n`
      }
    }

    vertexOffset += position.count
  }

  downloadBlob(new Blob([output], { type: 'text/plain;charset=utf-8' }), nextExportName('obj'))
  disposeExportMeshes(exportMeshes)
}

function exportGlb(): void {
  const exportMeshes = buildExportMeshes()
  if (exportMeshes.length === 0) {
    return
  }

  const exporter = new GLTFExporter()
  const exportGroup = new THREE.Group()
  for (const mesh of exportMeshes) {
    exportGroup.add(mesh)
  }

  exporter.parse(
    exportGroup,
    (result) => {
      if (result instanceof ArrayBuffer) {
        downloadBlob(new Blob([result], { type: 'model/gltf-binary' }), nextExportName('glb'))
      }
      disposeExportMeshes(exportMeshes)
    },
    () => {
      disposeExportMeshes(exportMeshes)
    },
    { binary: true },
  )
}

function exportScreenshot(): void {
  renderer.render(scene, camera)
  renderer.domElement.toBlob((blob) => {
    if (!blob) {
      return
    }

    downloadBlob(blob, nextExportName('png'))
  }, 'image/png')
}

function clampPanelToViewport(): void {
  if (window.innerWidth <= 700) {
    uiPanel.style.left = ''
    uiPanel.style.top = ''
    return
  }

  const rect = uiPanel.getBoundingClientRect()
  const maxLeft = Math.max(12, window.innerWidth - rect.width - 12)
  const maxTop = Math.max(12, window.innerHeight - rect.height - 12)
  const nextLeft = THREE.MathUtils.clamp(rect.left, 12, maxLeft)
  const nextTop = THREE.MathUtils.clamp(rect.top, 12, maxTop)

  uiPanel.style.left = `${nextLeft}px`
  uiPanel.style.top = `${nextTop}px`
  uiPanel.style.right = 'auto'
  uiPanel.style.bottom = 'auto'
}

function bindSectionCollapses(): void {
  const headers = app.querySelectorAll<HTMLButtonElement>('.panel-section-header')
  for (const header of headers) {
    header.addEventListener('click', () => {
      const section = header.closest<HTMLElement>('.panel-section')
      if (!section) {
        return
      }

      const collapsed = section.classList.toggle('is-collapsed')
      header.setAttribute('aria-expanded', collapsed ? 'false' : 'true')
    })
  }
}

function beginPanelDrag(event: PointerEvent): void {
  if (window.innerWidth <= 700) {
    return
  }

  if (event.target instanceof Element && event.target.closest('.collapse-button')) {
    return
  }

  const rect = uiPanel.getBoundingClientRect()
  draggingPanel = true
  panelDragOffset.x = event.clientX - rect.left
  panelDragOffset.y = event.clientY - rect.top
  uiPanel.style.left = `${rect.left}px`
  uiPanel.style.top = `${rect.top}px`
  uiPanel.style.right = 'auto'
  uiPanel.style.bottom = 'auto'
  ;(event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId)
}

function isTypingInUi(): boolean {
  const activeElement = document.activeElement
  return (
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    activeElement instanceof HTMLSelectElement ||
    activeElement?.hasAttribute('contenteditable') === true
  )
}

function clearHandleInteraction(): void {
  pendingHandleClick = null
  draggingOutlinePointId = null
  draggingAnchorIndex = null
}

startButton.addEventListener('click', toggleSolver)
resetButton.addEventListener('click', resetSimulationState)
exportObjButton.addEventListener('click', exportObj)
exportGlbButton.addEventListener('click', exportGlb)
exportScreenshotButton.addEventListener('click', exportScreenshot)

pressureSlider.addEventListener('input', () => {
  updatePressureLabel()
  simulation?.setPressure(getPressureValue())
  refreshUiState()
})

crownBiasSlider.addEventListener('input', () => {
  updateCrownBiasLabel()
  simulation?.setCrownBias(getCrownBiasValue())
})

pressureScaleSlider.addEventListener('input', () => {
  updatePressureScaleLabel()
  simulation?.setPressureScale(getPressureScaleValue())
})

pressureResponseSlider.addEventListener('input', () => {
  updatePressureResponseLabel()
  simulation?.setPressureResponse(getPressureResponseValue())
})

dampingSlider.addEventListener('input', () => {
  updateDampingLabel()
  simulation?.setDamping(getDampingValue())
})

substepsSlider.addEventListener('input', () => {
  updateSubstepsLabel()
  simulation?.setSubsteps(getSubstepsValue())
})

constraintIterationsSlider.addEventListener('input', () => {
  updateConstraintIterationsLabel()
  simulation?.setConstraintIterations(getConstraintIterationsValue())
})

stiffnessSlider.addEventListener('input', () => {
  updateStiffnessLabel()
  simulation?.setStiffness(getStiffnessValue())
})

maxDeltaTimeSlider.addEventListener('input', () => {
  updateMaxDeltaTimeLabel()
  simulation?.setMaxDeltaTime(getMaxDeltaTimeValue())
})

subdivisionLevelSlider.addEventListener('input', () => {
  updateSubdivisionLevelLabel()
  simulation?.setSubdivisionLevel(getSubdivisionLevelValue())
})

meshDensitySlider.addEventListener('input', () => {
  updateMeshDensityLabel()
  if (!simulation) {
    return
  }

  buildSimulation(true)
  refreshUiState()
})

baseGridToggle.addEventListener('change', () => {
  showBaseGrid = baseGridToggle.checked
  applyDisplayVisibilityState()
})

wireToggle.addEventListener('change', () => {
  showWireframe = wireToggle.checked
  applyDisplayVisibilityState()
})

reflectionToggle.addEventListener('change', () => {
  reflectionsEnabled = reflectionToggle.checked
  applyReflectionState()
})

renderer.domElement.addEventListener('contextmenu', (event) => {
  event.preventDefault()
})

uiPanel.addEventListener('contextmenu', (event) => {
  event.preventDefault()
})

collapseToggle.addEventListener('pointerdown', (event) => {
  event.stopPropagation()
})

collapseToggle.addEventListener('click', () => {
  const collapsed = uiPanel.classList.toggle('is-collapsed')
  collapseToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true')
  clampPanelToViewport()
})

uiHandleTop.addEventListener('pointerdown', beginPanelDrag)
uiHandleBottom.addEventListener('pointerdown', beginPanelDrag)

renderer.domElement.addEventListener(
  'pointerdown',
  (event: PointerEvent) => {
    if (event.button === 1 || event.button === 2) {
      controls.enabled = true
      return
    }

    if (event.button !== 0) {
      return
    }

    controls.enabled = false

    if (simulation) {
      const anchorHandleHit = pickAnchorHandle(event.clientX, event.clientY)
      if (anchorHandleHit) {
        pendingHandleClick = {
          pointerId: event.pointerId,
          clientX: event.clientX,
          clientY: event.clientY,
          type: 'anchor',
          anchorIndex: Number(anchorHandleHit.object.userData.anchorIndex),
        }
        renderer.domElement.setPointerCapture(event.pointerId)
        event.stopPropagation()
        return
      }

      const meshVertexIndex = pickMeshVertex(event.clientX, event.clientY)
      if (meshVertexIndex !== null) {
        pendingHandleClick = {
          pointerId: event.pointerId,
          clientX: event.clientX,
          clientY: event.clientY,
          type: 'vertex',
          anchorIndex: meshVertexIndex,
        }
        renderer.domElement.setPointerCapture(event.pointerId)
        event.stopPropagation()
        return
      }

      controls.enabled = true
      return
    }

    const handleHit = pickOutlineHandle(event.clientX, event.clientY)
    if (handleHit) {
      const pointId = Number(handleHit.object.userData.pointId)
      const firstPointId = outline.points[0]?.id ?? null
      pendingHandleClick = {
        pointerId: event.pointerId,
        clientX: event.clientX,
        clientY: event.clientY,
        type: 'outline',
        pointId,
        canClose:
          pointId === firstPointId &&
          outline.points.length >= 3 &&
          validateOutline(outline.points, true).valid,
      }
      renderer.domElement.setPointerCapture(event.pointerId)
      event.stopPropagation()
      return
    }

    const point = getGroundIntersection(event.clientX, event.clientY)
    if (!point) {
      controls.enabled = true
      return
    }

    addOutlinePoint(point)
  },
  { capture: true },
)

renderer.domElement.addEventListener('pointermove', (event) => {
  if (pendingHandleClick && draggingOutlinePointId === null && draggingAnchorIndex === null) {
    if (pendingHandleClick.pointerId !== event.pointerId) {
      return
    }

    const dragDistance = Math.hypot(
      event.clientX - pendingHandleClick.clientX,
      event.clientY - pendingHandleClick.clientY,
    )

    if (dragDistance > CLICK_DRAG_THRESHOLD) {
      if (pendingHandleClick.type === 'outline') {
        draggingOutlinePointId = pendingHandleClick.pointId ?? null
      } else if (pendingHandleClick.type === 'anchor') {
        draggingAnchorIndex = pendingHandleClick.anchorIndex ?? null
        if (draggingAnchorIndex !== null) {
          beginAnchorDrag(draggingAnchorIndex)
        }
      } else {
        if (renderer.domElement.hasPointerCapture(event.pointerId)) {
          renderer.domElement.releasePointerCapture(event.pointerId)
        }
        pendingHandleClick = null
        controls.enabled = true
        return
      }
      pendingHandleClick = null
    } else {
      return
    }
  }

  if (draggingOutlinePointId !== null) {
    const point = getGroundIntersection(event.clientX, event.clientY)
    if (!point) {
      return
    }

    updateOutlinePoint(draggingOutlinePointId, point)
    return
  }

  if (draggingAnchorIndex !== null && simulation) {
    updatePointer(event.clientX, event.clientY)
    raycaster.setFromCamera(pointer, camera)
    const intersection = new THREE.Vector3()
    if (raycaster.ray.intersectPlane(anchorDragPlane, intersection)) {
      simulation.setPinnedVertexDisplayHeight(draggingAnchorIndex, intersection.y)
      rebuildAnchorHandles()
    }
  }
})

renderer.domElement.addEventListener('pointerup', (event) => {
  if (draggingOutlinePointId !== null) {
    if (renderer.domElement.hasPointerCapture(event.pointerId)) {
      renderer.domElement.releasePointerCapture(event.pointerId)
    }
    draggingOutlinePointId = null
    controls.enabled = true
    return
  }

  if (draggingAnchorIndex !== null) {
    if (renderer.domElement.hasPointerCapture(event.pointerId)) {
      renderer.domElement.releasePointerCapture(event.pointerId)
    }
    draggingAnchorIndex = null
    rebuildAnchorHandles()
    refreshUiState()
    controls.enabled = true
    return
  }

  if (pendingHandleClick && pendingHandleClick.pointerId === event.pointerId) {
    if (renderer.domElement.hasPointerCapture(event.pointerId)) {
      renderer.domElement.releasePointerCapture(event.pointerId)
    }

    const dragDistance = Math.hypot(
      event.clientX - pendingHandleClick.clientX,
      event.clientY - pendingHandleClick.clientY,
    )

    if (dragDistance <= CLICK_DRAG_THRESHOLD && pendingHandleClick.type === 'outline' && pendingHandleClick.canClose) {
      closeOutline()
    } else if (
      dragDistance <= CLICK_DRAG_THRESHOLD &&
      pendingHandleClick.type === 'vertex' &&
      simulation &&
      pendingHandleClick.anchorIndex !== undefined
    ) {
      simulation.ensurePinnedVertex(pendingHandleClick.anchorIndex)
      rebuildAnchorHandles()
      refreshUiState()
    }

    pendingHandleClick = null
    controls.enabled = true
    return
  }

  controls.enabled = true
})

renderer.domElement.addEventListener('pointercancel', (event) => {
  if (renderer.domElement.hasPointerCapture(event.pointerId)) {
    renderer.domElement.releasePointerCapture(event.pointerId)
  }

  clearHandleInteraction()
  controls.enabled = true
})

window.addEventListener('pointermove', (event) => {
  if (!draggingPanel) {
    return
  }

  uiPanel.style.left = `${event.clientX - panelDragOffset.x}px`
  uiPanel.style.top = `${event.clientY - panelDragOffset.y}px`
  uiPanel.style.right = 'auto'
  uiPanel.style.bottom = 'auto'
  clampPanelToViewport()
})

window.addEventListener('pointerup', (event) => {
  if (!draggingPanel) {
    return
  }

  draggingPanel = false
  if (uiHandleTop.hasPointerCapture(event.pointerId)) {
    uiHandleTop.releasePointerCapture(event.pointerId)
  }
  if (uiHandleBottom.hasPointerCapture(event.pointerId)) {
    uiHandleBottom.releasePointerCapture(event.pointerId)
  }
})

window.addEventListener('pointercancel', (event) => {
  if (!draggingPanel) {
    return
  }

  draggingPanel = false
  if (uiHandleTop.hasPointerCapture(event.pointerId)) {
    uiHandleTop.releasePointerCapture(event.pointerId)
  }
  if (uiHandleBottom.hasPointerCapture(event.pointerId)) {
    uiHandleBottom.releasePointerCapture(event.pointerId)
  }
})

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' || event.repeat || isTypingInUi() || simulation) {
    return
  }

  if (outline.points.length >= 3) {
    event.preventDefault()
    closeOutline()
  }
})

window.addEventListener('resize', onResize)

function onResize(): void {
  const width = window.innerWidth
  const height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height, false)
  clampPanelToViewport()
}

function animate(): void {
  const deltaTime = clock.getDelta()
  controls.update()
  groundGrid.update(camera)

  if (simulation && solverRunning) {
    simulation.setPressure(getPressureValue())
    simulationAccumulator += deltaTime
    const maxAccumulatedTime = FIXED_SIMULATION_STEP * MAX_SIMULATION_STEPS_PER_FRAME
    simulationAccumulator = Math.min(simulationAccumulator, maxAccumulatedTime)

    let stepCount = 0
    while (
      simulationAccumulator >= FIXED_SIMULATION_STEP &&
      stepCount < MAX_SIMULATION_STEPS_PER_FRAME
    ) {
      simulation.update(FIXED_SIMULATION_STEP)
      simulationAccumulator -= FIXED_SIMULATION_STEP
      stepCount += 1
    }
  } else {
    simulationAccumulator = 0
  }

  renderer.render(scene, camera)
}

rebuildOutlineVisuals()
bindSectionCollapses()
updatePressureLabel()
updateCrownBiasLabel()
applyDisplayVisibilityState()
applyReflectionState()
refreshUiState()
onResize()

requestAnimationFrame(() => {
  document.documentElement.classList.add('ui-ready')
})

window.addEventListener('beforeunload', () => {
  disposeSimulation()
  reflectionEnvironment.dispose()
  groundGrid.dispose()
  outlineHandleGeometry.dispose()
  anchorHandleGeometry.dispose()
  outlineHandleMaterial.dispose()
  outlineCloseMaterial.dispose()
  anchorHandleMaterial.dispose()
  outlineLineMaterial.dispose()
  invalidOutlineLineMaterial.dispose()
  renderer.dispose()
})

renderer.setAnimationLoop(animate)

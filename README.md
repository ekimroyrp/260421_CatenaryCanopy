# 260421_CatenaryCanopy

260421_CatenaryCanopy is a Vite + TypeScript + Three.js canopy form-finding tool for drawing a closed plan outline, auto-generating a triangulated mesh, and inflating a single-surface canopy between adjustable anchors. The app keeps the same polished scene shell and control panel style as the reference project, but the current workflow is simplified to one outline, pressure-driven shaping, click-to-pin mesh vertices, and vertical anchor-height editing.

## Features

- Floating Apple-style control panel, studio-light environment, and fading base grid adapted from the reference Three.js project
- Single closed-outline authoring workflow with click-to-place corners, point dragging, and Enter or start-point closure
- Automatic interior mesh generation from the outline using adaptive Delaunay triangulation
- Single-surface inflation solver with no simulated or rendered bottom sheet
- Corner anchors are created automatically from the outline, and any mesh vertex can also be clicked to become an anchor
- Vertical anchor dragging for fast support-height adjustments, plus double-click removal for added anchors
- Direct numeric entry in the Physics value fields alongside the sliders
- Anchor management controls for toggling automatic corner anchors, grounding all anchors, clearing extra anchors, or clearing the whole scene back to drawing mode
- Pressure-driven canopy shaping with live `Pressure` control from `0` to `100`
- Center-weighted `Crown Bias` control for pushing more lift toward the canopy top without changing the edge supports
- Advanced solver sliders for pressure scale, pressure response, damping, substeps, constraint iterations, stiffness, and max delta time
- Mesh refinement sliders for subdivision level and mesh density
- Smoothed render surface with wire overlay and foil material toggle that stays visually attached to pinned anchor vertices
- OBJ export, GLB export, and screenshot export

## Getting Started

1. `npm install`
2. `npm run dev`
3. Open the local Vite URL shown in the terminal
4. Use `npm run build` to create a production build
5. Use `npm run preview` to inspect the built app locally

## Controls

- `LMB` on the ground places outline points
- Click the first outline point or press `Enter` to close the outline
- `LMB + Drag` on an outline point moves it before meshing
- Outline corners become anchors automatically after mesh generation
- `LMB` on a visible mesh vertex adds it as an anchor
- `LMB + Drag` on an anchor handle moves that anchor vertically
- `Double LMB` on an added anchor deletes that anchor
- `Start / Pause` runs or pauses the live inflation solve
- `Reset` rewinds the current simulation while keeping the existing outline, mesh, and anchors
- `Clear` in `Simulation` removes the current outline, mesh, and anchors and returns to blank drawing mode
- `Pressure` changes the inflation force from `0` to `100`
- `Crown Bias` increases center-weighted lift so the canopy crown inflates more than the perimeter
- Physics values can be changed with sliders or by typing directly into the value fields
- `Pressure Scale`, `Pressure Response`, `Damping`, `Substeps`, `Constraint Iterations`, `Stiffness`, and `Max Delta Time` tune the solver behavior
- `Subdivision Level` smooths the rendered canopy surface
- `Mesh Density` rebuilds the canopy mesh with coarser or finer triangulation
- `Corner Anchors` toggles automatic corner pinning
- `Ground` moves all current anchors to ground level
- `Clear` in `Anchors` removes extra anchors while keeping corner anchors when that toggle is on
- `Base Grid`, `Mesh Wires`, and `Foil Material` toggle display layers
- `Mouse Wheel` zooms, `MMB` pans, and `RMB` orbits
- `Export OBJ`, `Export GLB`, and `Export Screenshot` save the current result

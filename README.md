# 260421_CatenaryCanopy

260421_CatenaryCanopy is a Vite + TypeScript + Three.js canopy form-finding tool for drawing a closed plan outline, auto-generating a triangulated mesh, and inflating a single-surface canopy between corner anchors. The app keeps the same polished scene shell and control panel style as the reference project, but the current workflow is simplified to one outline, fixed corner supports, pressure-driven shaping, and vertical anchor-height editing.

## Features

- Floating Apple-style control panel, studio-light environment, and fading base grid adapted from the reference Three.js project
- Single closed-outline authoring workflow with click-to-place corners, point dragging, and Enter or start-point closure
- Automatic interior mesh generation from the outline using adaptive Delaunay triangulation
- Single-surface inflation solver with no simulated or rendered bottom sheet
- Corner-only anchor workflow where the outline corners become the fixed supports automatically
- Vertical corner-anchor dragging for fast support-height adjustments
- Pressure-driven canopy shaping with live `Pressure` control from `0` to `100`
- Advanced solver sliders for pressure scale, pressure response, damping, substeps, constraint iterations, stiffness, and max delta time
- Mesh refinement sliders for subdivision level and mesh density
- Smoothed render surface with wire overlay and foil material toggle
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
- Outline corners become the fixed anchors automatically after mesh generation
- `LMB + Drag` on a corner anchor handle moves that anchor vertically
- `Start / Pause` runs or pauses the live inflation solve
- `Reset` rewinds the current simulation while keeping the existing outline, mesh, and corner anchors
- `Pressure` changes the inflation force from `0` to `100`
- `Pressure Scale`, `Pressure Response`, `Damping`, `Substeps`, `Constraint Iterations`, `Stiffness`, and `Max Delta Time` tune the solver behavior
- `Subdivision Level` smooths the rendered canopy surface
- `Mesh Density` rebuilds the canopy mesh with coarser or finer triangulation
- `Base Grid`, `Mesh Wires`, and `Foil Material` toggle display layers
- `Mouse Wheel` zooms, `MMB` pans, and `RMB` orbits
- `Export OBJ`, `Export GLB`, and `Export Screenshot` save the current result

# 260421_CatenaryCanopy

260421_CatenaryCanopy is a Vite + TypeScript + Three.js canopy form-finding tool for drawing a closed plan outline, auto-generating a triangulated mesh, pinning any mesh vertices as anchors, and relaxing the sheet under gravity to produce an inverted funicular canopy surface.

## Features

- Floating Apple-style control panel, studio-light environment, and fading base grid adapted from the reference Three.js project
- Single closed-outline authoring workflow with click-to-place corners, point dragging, and Enter or start-point closure
- Automatic interior mesh generation from the outline using adaptive Delaunay triangulation
- Vertex-level anchor editing where any mesh vertex can be pinned or unpinned
- Vertical anchor dragging for fast support-height adjustments
- Live hanging-mesh relaxation solver with gravity control defaulting to `9.81 m/s²`
- Inverted display of the hanging solve so the visible result matches funicular canopy references
- Wire overlay, foil material toggle, OBJ export, GLB export, and screenshot export

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
- `LMB` on a mesh vertex toggles it as an anchor
- `LMB + Drag` on an anchored handle moves that anchor vertically
- `Start / Pause` runs or pauses the live catenary relaxation
- `Reset` clears the current canopy and returns to outline drawing
- `Gravity` changes the solver acceleration in `m/s²`
- `Base Grid`, `Mesh Wires`, and `Foil Material` toggle display layers
- `Mouse Wheel` zooms, `MMB` pans, and `RMB` orbits
- `Export OBJ`, `Export GLB`, and `Export Screenshot` save the current result

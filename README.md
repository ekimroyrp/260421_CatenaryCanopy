# 260421_CatenaryCanopy

260421_CatenaryCanopy is a Vite + TypeScript + Three.js canopy form tool for drawing a closed plan outline, generating a triangulated membrane, and shaping a single-surface inflatable canopy between movable anchors. The app keeps the polished floating panel, lighting, materials, and export workflow from the reference project, but the current build is focused on direct outline drawing, mesh-vertex anchor editing, pressure-based crown shaping, and a GitHub Pages-ready static deployment path.

## Features
- Vite + TypeScript + Three.js setup with a flat static build output that can be packaged for GitHub Pages deployment.
- Floating Apple-style control panel, studio reflection environment, foil material, and fading infinite grid adapted from the reference scene shell.
- Single closed-outline workflow with click-to-place corners, point dragging before meshing, and closure by `Enter` or reconnecting to the first point.
- Automatic adaptive Delaunay mesh generation from the drawn boundary, with a single rendered and simulated canopy surface.
- Corner anchors can be created automatically, and any visible mesh vertex can also be clicked to become an extra anchor.
- Anchor editing includes vertical drag movement, double-click deletion for added anchors, ground-all anchors, clear extra anchors, and full scene clear back to blank drawing mode.
- Snapshot-based editor history supports undo and redo for outline edits, anchor edits, and committed control changes without breaking the current canopy workflow.
- Physics controls include live pressure shaping, crown bias, pressure scale, pressure response, damping, substeps, constraint iterations, stiffness, max delta time, subdivision level, and mesh density.
- Physics value fields are editable directly by typing, while staying synced with the sliders.
- Hover feedback highlights interactive outline points and anchors, including a green close-state highlight on the first point when the outline can be finished.
- OBJ export, GLB export, and screenshot export are available from the same panel workflow as the live editor.

## Getting Started
1. `npm install`
2. `npm run dev` to start Vite on the local development URL
3. Draw an outline, close it, then use anchors and physics controls to shape the canopy
4. `npm run build` to emit a production build and type-check through `tsc`
5. `npm run preview` to inspect the compiled bundle locally

## Controls
- `LMB` on the ground places outline points.
- Click the first outline point or press `Enter` to close the outline.
- `LMB + Drag` on an outline point moves it before meshing.
- Outline corners can be used as anchors automatically when `Corner Anchors` is enabled.
- `LMB` on a visible mesh vertex adds that vertex as an anchor.
- `LMB + Drag` on an anchor moves it vertically.
- `Double LMB` on an added anchor deletes that anchor.
- `Ctrl+Z` undoes editor actions and `Ctrl+Y` / `Ctrl+Shift+Z` redoes them.
- `Start / Pause` runs or pauses the live inflation solve.
- `Reset` rewinds the current solve while keeping the current outline, mesh, and anchors.
- `Clear` in `Simulation` removes the outline, mesh, and anchors and returns to blank drawing mode.
- `Pressure` and `Crown Bias` shape the canopy lift and crown fullness.
- `Pressure Scale`, `Pressure Response`, `Damping`, `Substeps`, `Constraint Iterations`, `Stiffness`, `Max Delta Time`, `Subdivision Level`, and `Mesh Density` tune the solver and render mesh.
- Physics values can be adjusted either with sliders or by typing directly into the numeric value fields.
- `Corner Anchors` toggles automatic corner pinning.
- `Ground` moves all current anchors to ground level.
- `Clear` in `Anchors` removes added anchors while preserving corner anchors when that toggle is enabled.
- `Base Grid`, `Mesh Wires`, and `Foil Material` toggle display layers.
- `Mouse Wheel` zooms, `MMB` pans, and `RMB` orbits.
- `Export OBJ`, `Export GLB`, and `Export Screenshot` save the current canopy state.

## Deployment
- **Local production preview:** `npm install`, then `npm run build` followed by `npm run preview` to inspect the compiled bundle.
- **Publish to GitHub Pages:** From a clean `main`, run `npm run build -- --base=./`. Checkout (or create) the `gh-pages` branch in a separate worktree or temp clone, copy everything inside `dist/` plus a `.nojekyll` marker to its root, commit with a descriptive message, `git push origin gh-pages`, then switch back to `main`.
- **Live demo:** https://ekimroyrp.github.io/260421_CatenaryCanopy/

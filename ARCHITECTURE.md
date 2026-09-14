# Claude of Duty: Vibe Slops II — Expo / React Native Rebuild

A native mobile rebuild of the browser-based, non-commercial fan FPS *Claude of Duty*,
targeting **Expo SDK 56**, **React Native 0.85**, **React 19.2**, and a fully declarative 3D
pipeline via **@react-three/fiber** and **@react-three/rapier**. The map is derived from the
*Black Ops II* **Hijacked** aesthetic (yacht + tropical water) but uses only three external
GLB models + 100% procedural geometry, materials, and audio.

## Architecture overview

```
app/                     # Expo Router screens
  _layout.tsx            # Root: gesture handler, Sentry, status bar
  index.tsx              # Main menu
  settings.tsx           # Settings + credits
  game/
    _layout.tsx
    index.tsx            # In-match: GameCanvas + HUD + touch controls

src/
  components/            # Shared UI (Button, MenuShell, LoadingScreen overlays)
  hud/                   # Skia-based HUD widgets + HudCanvas
  game/
    scene/               # R3F canvas, map, player, weapons, effects, grenades
    physics/             # Rapier world, character controller, colliders
    player/              # Movement, camera, health
    weapons/             # Ballistics, recoil, weapon state + data
    ai/                  # Bot AI + bot entities
    audio/               # Procedural gunshots, footsteps, attenuation
    input/               # Touch controls, gestures, input manager
    store/               # Zustand game + settings stores + MMKV persist
    utils/               # Math, logger, model probe, procedural geometry
    world.ts             # Shared world constants / spawn points
  sentry/                # Error boundary + init
```

## Key design decisions

- **Landscape-only**, full-screen, no Expo Go (native modules required).
- **Procedural-first**: audio is synthesized once into the app cache; most props are
  generated with three.js BufferGeometry. Only yacht / NV4 / ghost are real GLBs.
- **Skia HUD** layered over the GL view for crisp, low-latency reticle, minimap, bars.
- **Rapier** for physics + character controller; bullets are raycasts with simple lag
  compensation / hit registration on the client (single-player / offline bots).
- **Zustand + MMKV** for fast, persistent settings and match state.
- **Sentry** for crash reporting (optional DSN).

## Build & run notes

See root README. Physical device required. Models must be placed in `assets/models/`
before a production build; the loader falls back to procedural cubes if they are missing.

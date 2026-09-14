# Claude of Duty: Vibe Slops II 🛳🔫

Unofficial, non-commercial fan FPS for iOS & Android. Expo SDK 56 · React Native 0.85 ·
React Three Fiber + Rapier · Skia HUD · 100% procedural audio/props, exactly **three** external
GLB models. Unaffiliated with Activision/Treyarch/Microsoft/Anthropic/Zhipu AI.

## Quick start
```bash
npm install
npx expo install --fix     # aligns versions to your installed Expo SDK
npx expo run:ios           # physical device REQUIRED (simulators unsupported)
npx expo run:android
```
> Expo Go is **not** supported (native modules: expo-gl, rapier, mmkv, reanimated, skia, sentry).

## Required models (drop into `assets/models/`, then rebuild)
| File | Model | Where |
|---|---|---|
| `yacht.glb` | Frickie's Yacht | https://sketchfab.com/3d-models/frickies-yacht-a5b72f2a23cd4e1f9eaf49059606c7a3 |
| `nv4.glb` | Custom Carbine NV4 (COD) | https://sketchfab.com/3d-models/custom-carbine-rifle-nv4-cod-195d2de670b24e22a98cf9d47607e646 |
| `ghost.glb` | Ghost COD Soldier | https://sketchfab.com/3d-models/ghost-cod-soldier-guy-950353636244443c833de4137f660538 |

Export as **GLB without Draco compression**, budget: yacht < 15 MB, nv4 < 3 MB, ghost < 5 MB.
Respect each model's Creative Commons license — attribution is shown in Settings → Credits.

Placeholder cube GLBs are pre-generated so the game runs before you add the real files
(they are auto-detected as stand-ins and flagged in the loading screen).

## Controls (landscape)
- **Left thumb** — virtual stick (push fully forward = sprint; double-tap stick = sprint lock)
- **Right thumb drag** — look · **double-tap look pad** — jump
- **FIRE** big right button (hold) · **ADS** hold · **JUMP / RELOAD / FRAG** buttons
- **☰** pause

## Troubleshooting
- GLB missing/invalid → app auto-falls back to procedural stand-ins and tells you.
- Audio is synthesized at first launch into the app cache (needs ~1 MB, once per install).

## Credits & legal
Original code: MIT. Yacht/NV4/Ghost models: © their Sketchfab authors under CC licenses.
"Call of Duty", "Black Ops II", "Hijacked" are trademarks of Activision. This is a meme-grade
fan project ("vibe slop"), no assets are taken from any commercial game.

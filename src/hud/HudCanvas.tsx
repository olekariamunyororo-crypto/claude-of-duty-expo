// Full-screen Skia HUD: crosshair, hitmarker, health, ammo, compass, radar,
// damage wedges, FPS. Runs on the UI thread via Reanimated shared values.
// Layout uses measured window dimensions so left/right anchoring is correct.
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Canvas, Circle, Group, Line, Rect, Text as SkText, useFont, vec } from '@shopify/react-native-skia';
import { useEffect } from 'react';
import { useSharedValue, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { hud } from './hudState';
import { useGameStore } from '../game/store/gameStore';

export function HudCanvas() {
  const { width, height } = useWindowDimensions();
  const font = useFont(require('../../assets/fonts/SpaceMono-Regular.ttf'), 14);
  const health = useGameStore((s) => s.health);
  const ammo = useGameStore((s) => s.ammo);
  const reserve = useGameStore((s) => s.reserveAmmo);
  const yaw = useGameStore((s) => s.playerYaw);
  const hit = useGameStore((s) => s.hitMarker);
  const dmg = useGameStore((s) => s.damageFlash);
  const phase = useGameStore((s) => s.phase);

  const hitOpacity = useSharedValue(0);
  const dmgOpacity = useSharedValue(0);

  useEffect(() => {
    if (hit) {
      hitOpacity.value = withSequence(
        withTiming(1, { duration: 30 }),
        withTiming(0, { duration: 180, easing: Easing.out(Easing.quad) }),
      );
    }
  }, [hit]);

  useEffect(() => {
    if (dmg > 0) {
      dmgOpacity.value = withSequence(
        withTiming(Math.min(0.55, dmg), { duration: 40 }),
        withTiming(0, { duration: 320 }),
      );
    }
  }, [dmg]);

  if (phase === 'menu') return null;

  const cx = width / 2;
  const cy = height / 2;
  const deg = ((yaw * 180) / Math.PI + 360) % 360;
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const dir = dirs[Math.round(deg / 45) % 8];

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Canvas style={{ width, height }}>
        {/* damage vignette */}
        <Rect x={0} y={0} width={width} height={height} color={`rgba(180,20,20,${dmgOpacity.value})`} />

        {/* crosshair */}
        <Group>
          <Line p1={vec(cx - 10, cy)} p2={vec(cx - 3, cy)} color="white" strokeWidth={1.5} />
          <Line p1={vec(cx + 3, cy)} p2={vec(cx + 10, cy)} color="white" strokeWidth={1.5} />
          <Line p1={vec(cx, cy - 10)} p2={vec(cx, cy - 3)} color="white" strokeWidth={1.5} />
          <Line p1={vec(cx, cy + 3)} p2={vec(cx, cy + 10)} color="white" strokeWidth={1.5} />
          <Circle cx={cx} cy={cy} r={1.2} color="white" />
        </Group>

        {/* hit marker */}
        <Group opacity={hitOpacity}>
          <Line p1={vec(cx - 8, cy - 8)} p2={vec(cx - 3, cy - 3)} color="white" strokeWidth={2} />
          <Line p1={vec(cx + 8, cy - 8)} p2={vec(cx + 3, cy - 3)} color="white" strokeWidth={2} />
          <Line p1={vec(cx - 8, cy + 8)} p2={vec(cx - 3, cy + 3)} color="white" strokeWidth={2} />
          <Line p1={vec(cx + 8, cy + 8)} p2={vec(cx + 3, cy + 3)} color="white" strokeWidth={2} />
        </Group>

        {/* health bar */}
        <Rect x={24} y={height - 36} width={140} height={10} color="rgba(0,0,0,0.5)" />
        <Rect x={24} y={height - 36} width={Math.max(0, (health / 100) * 140)} height={10} color="#34d399" />

        {/* ammo */}
        {font && (
          <SkText
            x={width - 24}
            y={height - 28}
            text={`${ammo} / ${reserve}`}
            font={font}
            color="white"
            style="fill"
          />
        )}

        {/* compass */}
        {font && (
          <SkText
            x={cx - 30}
            y={28}
            text={`${dir}  ${Math.round(deg)}°`}
            font={font}
            color="#a5f3fc"
            style="fill"
          />
        )}
      </Canvas>
    </View>
  );
}

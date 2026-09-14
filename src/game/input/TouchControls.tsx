import { useRef } from 'react';
import { View, Text, PanResponder, StyleSheet, Dimensions } from 'react-native';
import { input } from './InputManager';
import { createTapDetector } from './Gestures';

const { width: W, height: H } = Dimensions.get('window');

export function TouchControls() {
  const stickOrigin = useRef({ x: 0, y: 0 });
  const lookTap = useRef(createTapDetector());
  const stickTap = useRef(createTapDetector());

  const stickPan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        stickOrigin.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
        if (stickTap.current.tap()) input.sprint = true;
      },
      onPanResponderMove: (e) => {
        const dx = e.nativeEvent.pageX - stickOrigin.current.x;
        const dy = e.nativeEvent.pageY - stickOrigin.current.y;
        const len = Math.hypot(dx, dy) || 1;
        const max = 56;
        const nx = Math.max(-1, Math.min(1, dx / max));
        const ny = Math.max(-1, Math.min(1, -dy / max));
        input.moveX = nx;
        input.moveY = ny;
        if (len > max * 0.9) input.sprint = true;
      },
      onPanResponderRelease: () => {
        input.moveX = 0;
        input.moveY = 0;
        input.sprint = false;
      },
    }),
  ).current;

  const lookPan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (lookTap.current.tap()) input.jump = true;
      },
      onPanResponderMove: (_, g) => {
        input.lookDX += g.dx;
        input.lookDY += g.dy;
      },
    }),
  ).current;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* left stick zone */}
      <View style={styles.stickZone} {...stickPan.panHandlers} />
      {/* right look zone */}
      <View style={styles.lookZone} {...lookPan.panHandlers} />
      {/* action buttons */}
      <View style={styles.actions}>
        <Btn label="FIRE" onPressIn={() => (input.fire = true)} onPressOut={() => (input.fire = false)} big />
        <Btn label="ADS" onPressIn={() => (input.ads = true)} onPressOut={() => (input.ads = false)} />
        <Btn label="R" onPress={() => (input.reload = true)} />
        <Btn label="G" onPress={() => (input.grenade = true)} />
      </View>
    </View>
  );
}

function Btn({
  label,
  onPress,
  onPressIn,
  onPressOut,
  big,
}: {
  label: string;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  big?: boolean;
}) {
  return (
    <View
      onTouchStart={onPressIn ?? onPress}
      onTouchEnd={onPressOut}
      style={[styles.btn, big && styles.btnBig]}
    >
      <Text style={styles.btnText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stickZone: { position: 'absolute', left: 0, bottom: 0, width: W * 0.4, height: H * 0.55 },
  lookZone: { position: 'absolute', right: 0, top: 0, width: W * 0.55, height: H * 0.7 },
  actions: { position: 'absolute', right: 16, bottom: 24, alignItems: 'flex-end', gap: 10 },
  btn: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBig: { width: 76, height: 76, borderRadius: 38, backgroundColor: 'rgba(220,40,40,0.55)' },
  btnText: { color: 'white', fontWeight: '700', fontSize: 12 },
});

import { router } from 'expo-router';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { MenuShell } from '../src/components/MenuShell';
import { Button } from '../src/components/Button';
import { useSettings } from '../src/game/store/settingsStore';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-white/10">
      <Text className="text-white/90 text-[15px]">{label}</Text>
      {children}
    </View>
  );
}

export default function Settings() {
  const s = useSettings();

  return (
    <MenuShell>
      <Text className="text-white font-bold text-[28px] mb-4">SETTINGS</Text>
      <ScrollView className="w-full max-w-md px-4" contentContainerStyle={{ paddingBottom: 40 }}>
        <Row label="Look sensitivity">
          <View className="flex-row gap-2">
            {[0.6, 1.0, 1.4].map((v) => (
              <Pressable
                key={v}
                className={`px-3 py-1 rounded ${s.lookSensitivity === v ? 'bg-cyan-400' : 'bg-white/10'}`}
                onPress={() => s.set({ lookSensitivity: v })}
              >
                <Text className={`font-bold ${s.lookSensitivity === v ? 'text-black' : 'text-white'}`}>{v.toFixed(1)}</Text>
              </Pressable>
            ))}
          </View>
        </Row>
        <Row label="SFX volume">
          <View className="flex-row gap-2">
            {[0, 0.5, 1].map((v) => (
              <Pressable
                key={v}
                className={`px-3 py-1 rounded ${s.sfxVolume === v ? 'bg-cyan-400' : 'bg-white/10'}`}
                onPress={() => s.set({ sfxVolume: v })}
              >
                <Text className={`font-bold ${s.sfxVolume === v ? 'text-black' : 'text-white'}`}>{Math.round(v * 100)}%</Text>
              </Pressable>
            ))}
          </View>
        </Row>
        <Row label="Force procedural models">
          <Pressable
            className={`px-3 py-1 rounded ${s.proceduralModels ? 'bg-amber-400' : 'bg-white/10'}`}
            onPress={() => s.set({ proceduralModels: !s.proceduralModels })}
          >
            <Text className={`font-bold ${s.proceduralModels ? 'text-black' : 'text-white'}`}>{s.proceduralModels ? 'ON' : 'AUTO'}</Text>
          </Pressable>
        </Row>
        <Text className="text-slate-400 text-[11px] leading-4 mt-5">
          CREDITS — 3D models via Sketchfab (Creative Commons): "Frickie's Yacht", "Custom Carbine
          Rifle NV4 (COD)", "Ghost COD Soldier Guy". Unofficial fan project; not affiliated with
          Activision, Treyarch, Microsoft, Anthropic or Zhipu AI. Original code: MIT.
        </Text>
        <View className="mt-6 mb-4">
          <Button title="◀ BACK" onPress={() => router.back()} wide />
        </View>
      </ScrollView>
    </MenuShell>
  );
}

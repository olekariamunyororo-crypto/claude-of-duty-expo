import React from 'react';
import { View, Text } from 'react-native';

type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message ?? 'Unknown error' };
  }

  componentDidCatch(error: Error) {
    console.error('[ErrorBoundary]', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-black items-center justify-center p-8">
          <Text className="text-red-400 font-bold text-[20px]">Something went wrong</Text>
          <Text className="text-white/60 mt-2 text-center">{this.state.message}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

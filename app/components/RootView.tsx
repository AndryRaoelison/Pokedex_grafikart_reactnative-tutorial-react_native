import useThemeColor from "@/hooks/useThemeColor";
import { useEffect } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps & {
  pokemonTypeBackground?: string;
};
export function RootView({ style, pokemonTypeBackground, ...rest }: Props) {
  const color = useThemeColor();
  const progress = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [color.tint, pokemonTypeBackground ?? color.tint]
      ),
    };
  }, [pokemonTypeBackground]);
  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 2700,
      easing: Easing.out(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });
  }, [pokemonTypeBackground]);

  if (!pokemonTypeBackground) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: color.tint }, style]}
        {...rest}
      />
    );
  } else {
    return (
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <SafeAreaView style={[styles.container, style]} {...rest} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

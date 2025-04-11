import { Colors } from "@/constants/Colors";
import useThemeColor from "@/hooks/useThemeColor";
import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps;
export function RootView({ style, ...rest }: Props) {
  const color = useThemeColor();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: color.tint }, style]}
      {...rest}
    ></SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

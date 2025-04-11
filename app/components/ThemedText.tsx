import { StyleSheet, Text, TextProps } from "react-native";

import { Colors } from "@/constants/Colors";
import useThemeColor from "@/hooks/useThemeColor";

type ColorKeys = keyof typeof Colors.light;

type Props = TextProps & {
  variant?: keyof typeof styles;
  color?: ColorKeys;
};
const styles = StyleSheet.create({
  body1: {
    fontSize: 14,
    lineHeight: 16,
  },
  body2: {
    fontSize: 12,
    lineHeight: 16,
  },
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },
  caption: {
    fontSize: 8,
    lineHeight: 12,
  },
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
  },
  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle1: {
    fontSize: 20,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },
});

const ThemedText = ({ variant = "body3", color, style, ...rest }: Props) => {
  const colors = useThemeColor();
  return (
    <Text
      style={[styles[variant], { color: colors[color ?? "grayDark"] }, style]}
      {...rest}
    />
  );
};

export default ThemedText;

import { StyleSheet, View, ViewProps } from "react-native";
type Props = ViewProps & {
  gap?: number;
};

export function Row({ style, gap = 6, ...rest }: Props) {
  return <View style={[style, { gap: gap }, styles.wrapper]} {...rest} />;
}
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

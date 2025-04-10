import useThemeColor from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";

type Props = {
  checked: boolean;
};
export function RadioButton({ checked }: Props) {
  const colors = useThemeColor();
  return (
    <View style={[styles.border, { borderColor: colors.tint }]}>
      {checked && (
        <View style={[styles.inner, { backgroundColor: colors.tint }]}></View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  border: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

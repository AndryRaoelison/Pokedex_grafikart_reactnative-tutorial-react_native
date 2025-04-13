import { StyleSheet, View, ViewProps } from "react-native";
import { Row } from "./Row";
import useThemeColor from "@/hooks/useThemeColor";
import ThemedText from "./ThemedText";

type Props = ViewProps & {
  name: string;
  value: number;
  textColor: string;
};

const textFormating = (text: string): string => {
  return text
    .replaceAll("attack", "ATK")
    .replaceAll("defense", "DEF")
    .replaceAll("special", "SPC")
    .replaceAll("speed", "SPD")
    .toUpperCase();
};

export function BarStats({ name, value, textColor, style, ...rest }: Props) {
  const color = useThemeColor();
  return (
    <View style={[style]} {...rest}>
      <Row>
        <ThemedText
          variant="subtitle2"
          style={[
            styles.nameStat,
            { color: textColor, borderColor: color.grayLight, width: 70 },
          ]}
        >
          {textFormating(name)}
        </ThemedText>
        <ThemedText
          variant="subtitle2"
          style={{ color: textColor, borderColor: color.grayLight, width: 30 }}
        >
          {value}
        </ThemedText>
        <Row style={[styles.externBar, { backgroundColor: color.grayLight }]}>
          <View
            style={[
              styles.statBar,
              { backgroundColor: textColor, flex: value },
            ]}
          ></View>
          <View style={[styles.innerBar, { flex: 200 - value }]}></View>
        </Row>
      </Row>
    </View>
  );
}
const styles = StyleSheet.create({
  nameStat: {
    borderRightWidth: 2,
    borderStyle: "solid",
    paddingHorizontal: 4,
  },
  externBar: {
    flex: 1,
    borderRadius: 8,
  },
  statBar: {
    flex: 1,
    height: 10,
    borderRadius: 8,
  },
  innerBar: {
    height: 10,
    borderRadius: 8,
  },
});

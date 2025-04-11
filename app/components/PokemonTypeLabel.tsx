import { View, ViewProps, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";
import ThemedText from "./ThemedText";

type Props = ViewProps & {
  name: keyof (typeof Colors)["type"];
};
export function PokemonTypeLabel({ style, name }: Props) {
  return (
    <View style={[styles.tag, style]}>
      <ThemedText
        variant="subtitle2"
        color="grayWhite"
        style={{
          textTransform: "capitalize",
        }}
      >
        {name}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
});

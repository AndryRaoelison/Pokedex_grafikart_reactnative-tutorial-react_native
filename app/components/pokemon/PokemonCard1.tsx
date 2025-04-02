import { Image, StyleSheet, View, ViewStyle } from "react-native";
import Card from "../Card";
import ThemedText from "@/app/components/ThemedText";
import useThemeColor from "@/hooks/useThemeColor";

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export default function PokemonCard({ id, name, style }: Props) {
  const colors = useThemeColor();
  return (
    <Card style={styles.card}>
      <ThemedText
        style={{ alignSelf: "flex-end", padding: 2 }}
        variant="caption"
      >
        #{id.toString().padStart(3, "0")}
      </ThemedText>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        }}
        style={{ width: 100, height: 100 }} // Style OBLIGATOIRE
        resizeMode="contain"
      />
      <ThemedText>{name}</ThemedText>
      <View
        style={[styles.shadowView, { backgroundColor: colors.grayBackground }]}
      ></View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 7,
    alignItems: "center",
    position: "relative",
  },
  shadowView: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    height: 50,
    zIndex: -1,
  },
});

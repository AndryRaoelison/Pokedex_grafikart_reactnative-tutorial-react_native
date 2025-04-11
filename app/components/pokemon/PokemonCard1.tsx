import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Card from "../Card";
import ThemedText from "@/app/components/ThemedText";
import useThemeColor from "@/hooks/useThemeColor";
import { Link } from "expo-router";

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export default function PokemonCard({ id, style, name }: Props) {
  const colors = useThemeColor();
  return (
    <Link href={{ pathname: "/pokemon/[id]", params: { id: id } }} asChild>
      <Pressable style={[style]}>
        <Card style={[styles.card]}>
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
            style={{ width: 105, height: 100 }}
            resizeMode="contain"
          />
          <ThemedText style={{ textTransform: "capitalize" }}>
            {name}
          </ThemedText>
          <View
            style={[
              styles.shadowView,
              { backgroundColor: colors.grayBackground },
            ]}
          ></View>
        </Card>
      </Pressable>
    </Link>
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

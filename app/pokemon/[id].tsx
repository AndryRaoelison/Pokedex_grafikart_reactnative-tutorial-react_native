import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { RootView } from "../components/RootView";
import { Row } from "../components/Row";
import ThemedText from "../components/ThemedText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import useThemeColor from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import {
  getArtworklink,
  getPokemonHeight,
  getPokemonWeight,
} from "../functions/pokemon";
import Card from "../components/Card";
import { PokemonTypeLabel } from "../components/PokemonTypeLabel";
import { PokemonSpecs } from "../components/PokemonSpecs";

interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export default function pokemon() {
  const color = useThemeColor();
  const localParams = useLocalSearchParams() as { id: string };
  const { data, isFetching } = useFetchQuery("pokemon/[id]", {
    id: localParams.id,
  });
  const pokemonBackgroundColor: keyof (typeof Colors)["type"] =
    data?.types?.[0].type.name;
  const pokemonTypeBackground = pokemonBackgroundColor
    ? Colors["type"][pokemonBackgroundColor]
    : color.tint;
  const types = data?.types ?? [];
  return (
    <RootView style={{ backgroundColor: pokemonTypeBackground }}>
      {isFetching ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={color.grayLight} />
        </View>
      ) : (
        <>
          <Row style={{ justifyContent: "space-between" }}>
            <Image
              style={{
                height: 200,
                width: 200,
                opacity: 0.2,
                position: "absolute",
                right: 8,
                top: 8,
              }}
              source={require("@/assets/images/pokeball_big.png")}
              resizeMode="contain"
            />
            <Pressable onPress={router.back}>
              <Row style={{ justifyContent: "center" }}>
                <Image
                  style={styles.imageSizeStyle}
                  source={require("@/assets/images/arrow-left.png")}
                  resizeMode="contain"
                />
                <ThemedText
                  variant="headline"
                  color="grayWhite"
                  style={{ textTransform: "capitalize" }}
                >
                  {data?.name}
                </ThemedText>
              </Row>
            </Pressable>
            <ThemedText
              variant="subtitle1"
              color="grayWhite"
              style={{ paddingHorizontal: 5 }}
            >
              #{localParams.id.toString().padStart(3, "0")}
            </ThemedText>
          </Row>
          <View>
            <Image
              source={{ uri: getArtworklink(localParams.id) }}
              width={200}
              height={200}
              style={styles.pokemonImageStyle}
            />
            <Card style={styles.cardStyle}>
              <Row>
                {types.map(
                  (t: { type: { name: keyof (typeof Colors)["type"] } }) => (
                    <PokemonTypeLabel
                      key={t.type.name}
                      style={{
                        backgroundColor:
                          Colors["type"][t.type.name] ?? color.tint,
                      }}
                      name={t.type.name}
                    ></PokemonTypeLabel>
                  )
                )}
              </Row>
              <ThemedText
                variant="subtitle1"
                style={{ color: pokemonTypeBackground, paddingVertical: 5 }}
              >
                About
              </ThemedText>
              <Row style={{ justifyContent: "center", alignItems: "center" }}>
                <PokemonSpecs
                  title={getPokemonHeight(data?.height)}
                  description="Height"
                  image={require("@/assets/images/kilo.png")}
                  style={{
                    borderStyle: "solid",
                    borderRightWidth: 2,
                    borderBlockColor: color.grayLight,
                  }}
                />
                <PokemonSpecs
                  title={getPokemonWeight(data?.weight)}
                  description="Weight"
                  image={require("@/assets/images/ruler.png")}
                  style={{
                    borderStyle: "solid",
                    borderRightWidth: 2,
                    borderBlockColor: color.grayLight,
                  }}
                />

                <PokemonSpecs
                  title={data?.moves
                    .slice(0, 2)
                    .map((m: PokemonMove) => m?.move?.name.replace("-", " "))
                    .join("\n")}
                  description="Move"
                />
              </Row>
              <ThemedText
                variant="subtitle1"
                style={{ color: pokemonTypeBackground, paddingVertical: 5 }}
              >
                Base Stat
              </ThemedText>
            </Card>
          </View>
          <Text>Pokemon ID : {localParams.id}</Text>
        </>
      )}
    </RootView>
  );
}

const styles = StyleSheet.create({
  imageSizeStyle: {
    height: 40,
    width: 40,
  },
  pokemonImageStyle: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 2,
  },
  cardStyle: {
    marginTop: 144,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
    gap: 16,
  },
});

import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Audio } from "expo-av";

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
import { BarStats } from "../components/BarStats";

export default function pokemon() {
  const color = useThemeColor();
  const localParams = useLocalSearchParams() as { id: string };
  const { data, isFetching } = useFetchQuery("pokemon/[id]", {
    id: localParams.id,
  });
  const { data: bioFetch } = useFetchQuery("pokemon-species/[id]", {
    id: localParams.id,
  });
  const bio = bioFetch?.flavor_text_entries
    ?.find((bio: { language: { name: string } }) => bio.language.name === "en")
    ?.flavor_text.replaceAll("\n", " ");
  const pokemonBackgroundColor: keyof (typeof Colors)["type"] =
    data?.types?.[0].type.name;
  const pokemonTypeBackground = pokemonBackgroundColor
    ? Colors["type"][pokemonBackgroundColor]
    : color.tint;
  const types = data?.types ?? [];

  //OnImagePress handle the pokemons cries when it's pressed
  const onImagePress = async () => {
    const cry = data?.cries.latest;
    if (!cry) {
      return;
    }
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: cry,
      },
      {
        shouldPlay: true,
      }
    );
    sound.playAsync();
  };
  //This section work on navigation feature : (next - previous pokemon details page)
  const isFirstPokemon = localParams.id === "1";
  const isLastPokemon = localParams.id === "151";

  //previousPage handle the page change (show the previous pokemon based on ID) when it's pressed
  const previousPage = () => {
    const id = parseInt(localParams.id, 10);
    router.replace({
      pathname: "/pokemon/[id]",
      params: { id: Math.max(id - 1, 1) },
    });
  };
  //nextPage handle the page change (show the previous pokemon based on ID) when it's pressed
  const nextPage = () => {
    const id = parseInt(localParams.id, 10);
    router.replace({
      pathname: "/pokemon/[id]",
      params: { id: Math.min(id + 1, 151) },
    });
  };

  return (
    <RootView pokemonTypeBackground={pokemonTypeBackground}>
      {/*Setting backgroundcolor based on the pokemontype*/}
      {isFetching ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={color.grayLight} />
        </View>
      ) : (
        // Pokemon detail header section and link to get back
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
                  style={styles.arrowSizeStyle}
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
              style={{ paddingHorizontal: 5, paddingVertical: 4 }}
            >
              #{localParams.id.toString().padStart(3, "0")}
            </ThemedText>
          </Row>
          {/* Pokemon stat details  */}
          <View>
            <Row style={styles.pokemonImageStyle}>
              {isFirstPokemon ? (
                <View style={{ height: 25, width: 25 }} />
              ) : (
                <Pressable onPress={() => previousPage()}>
                  <Image
                    source={require("@/assets/images/chevron-left.png")}
                    style={styles.chevronSizeStyle}
                  />
                </Pressable>
              )}
              <Pressable onPress={onImagePress}>
                <Image
                  source={{ uri: getArtworklink(localParams.id) }}
                  width={200}
                  height={200}
                />
              </Pressable>
              {isLastPokemon ? (
                <View style={{ height: 25, width: 25 }} />
              ) : (
                <Pressable onPress={() => nextPage()}>
                  <Image
                    source={require("@/assets/images/chevron-right.png")}
                    style={styles.chevronSizeStyle}
                  />
                </Pressable>
              )}
            </Row>
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
              {/* Measurement */}
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
                    .map((m: { move: { name: string } }) =>
                      m?.move?.name.replace("-", " ")
                    )
                    .join("\n")}
                  description="Move"
                />
              </Row>
              <View style={{ alignSelf: "auto", paddingHorizontal: 15 }}>
                <ThemedText style={{ fontSize: 12 }}>{bio} </ThemedText>
              </View>
              <ThemedText
                variant="subtitle1"
                style={{ color: pokemonTypeBackground, paddingVertical: 5 }}
              >
                Base Stat
              </ThemedText>
              <View
                style={{
                  alignSelf: "stretch",
                  overflow: "hidden",
                  paddingHorizontal: 10,
                }}
              >
                {data?.stats.map(
                  (stat: { base_stat: number; stat: { name: string } }) => (
                    <BarStats
                      key={stat.stat.name}
                      name={stat.stat.name}
                      value={stat.base_stat}
                      textColor={pokemonTypeBackground}
                    />
                  )
                )}
              </View>
            </Card>
          </View>
        </>
      )}
    </RootView>
  );
}

const styles = StyleSheet.create({
  arrowSizeStyle: {
    height: 40,
    width: 40,
  },
  chevronSizeStyle: {
    height: 25,
    width: 25,
  },
  pokemonImageStyle: {
    position: "absolute",
    zIndex: 2,
    justifyContent: "space-between",

    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  cardStyle: {
    marginTop: 144,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
    gap: 16,
  },
});

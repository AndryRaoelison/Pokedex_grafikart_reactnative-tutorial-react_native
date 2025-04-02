import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemedText from "@/app/components/ThemedText";
import useThemeColor from "@/hooks/useThemeColor";
import Card from "./components/Card";
import PokemonCard from "./components/pokemon/PokemonCard1";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { getPokemonId } from "@/app/functions/pokemon";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  results: Pokemon[];
}

export default function Index() {
  const color = useThemeColor();
  const { data, isFetching } = useFetchQuery("pokemon?limit=21");

  const pokemons = data?.results ?? [];
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: color.tint, padding: 5 }]}
    >
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText variant={"headline"} color={"grayLight"}>
          Pokedex
        </ThemedText>
      </View>
      <Card style={styles.body}>
        <FlatList
          style={styles.list}
          columnWrapperStyle={styles.gridGap}
          contentContainerStyle={styles.gridGap}
          data={pokemons}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={color.tint} /> : null
          }
          numColumns={3}
          renderItem={({ item }) => (
            <PokemonCard
              id={getPokemonId(item.url)}
              name={item.name}
              style={{ flex: 1 / 3 }}
            />
          )}
          keyExtractor={(item) => item.url}
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 6,
  },
  body: {
    flex: 1,
    overflow: "visible",
    alignItems: "center",
    padding: 7,
  },
  image: {
    width: 36,
    height: 36,
  },
  list: {
    padding: 5,
  },
  gridGap: { gap: 8 },
});

/* note for lesson : 
    <Link href="/about">About</Link>
      <Link href={{ pathname: "/pokemon/[id]", params: { id: 5 } }}>
        Pokemon id:5
      </Link>


const pokemons = Array.from({ length: 35 }, (_, k) => ({
    name: "pokemon name",
    id: k + 1,
  }));
*/

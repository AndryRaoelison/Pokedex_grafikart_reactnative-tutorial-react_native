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
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { getPokemonId } from "@/app/functions/pokemon";
import { SearchSection } from "./components/SearchSection";
import { Row } from "./components/Row";
import { useState } from "react";

export default function Index() {
  const color = useThemeColor();
  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery("pokemon?limit=21");
  const [search, setSerch] = useState("");
  const pokemons = data?.pages.flatMap((page) => page.results) ?? [];
  let filteredPokemons = search
    ? pokemons.filter(
        (p) =>
          p.name.includes(search.toLowerCase()) ||
          getPokemonId(p.url).toString().includes(search.toLowerCase())
      )
    : pokemons;
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: color.tint, padding: 5 }]}
    >
      <Row style={styles.header} gap={12}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText variant={"headline"} color={"grayLight"}>
          Pokedex
        </ThemedText>
      </Row>
      <View>
        <SearchSection value={search} onChange={setSerch} />
      </View>
      <Card style={styles.body}>
        <FlatList
          style={styles.list}
          columnWrapperStyle={styles.gridGap}
          contentContainerStyle={styles.gridGap}
          data={filteredPokemons}
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
          onEndReached={search ? undefined : () => fetchNextPage()}
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
    padding: 6,
  },
  body: {
    flex: 1,
    overflow: "visible",
    alignItems: "center",
    paddingVertical: 7,
    marginTop: 8,
  },
  image: {
    width: 36,
    height: 36,
  },
  list: {
    padding: 5,
  },
  gridGap: { gap: 10 },
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

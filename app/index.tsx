import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";
import { useState } from "react";

import { getPokemonId } from "@/app/functions/pokemon";
import { SortButton } from "./components/SortButton";
import { RootView } from "./components/RootView";
import { Row } from "./components/Row";
import { SearchSection } from "./components/SearchSection";
import ThemedText from "@/app/components/ThemedText";
import useThemeColor from "@/hooks/useThemeColor";
import Card from "./components/Card";
import PokemonCard from "./components/pokemon/PokemonCard1";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";

export default function Index() {
  const colors = useThemeColor();
  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery("pokemon?limit=21");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"id" | "name">("id");
  const pokemons =
    data?.pages
      .flatMap((page) => page.results)
      .map((r) => ({ name: r.name, id: getPokemonId(r.url) })) ?? [];
  let filteredPokemons = [
    ...(search
      ? pokemons.filter(
          (p) =>
            p.name.includes(search.toLowerCase()) ||
            p.id.toString().includes(search.toLowerCase())
        )
      : pokemons),
  ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));
  return (
    <RootView>
      <Row style={styles.header} gap={12}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText variant={"headline"} color={"grayWhite"}>
          Pokedex
        </ThemedText>
      </Row>
      <Row style={{ paddingHorizontal: 4 }} gap={8}>
        <SearchSection value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>
      <Card style={styles.body}>
        <FlatList
          style={styles.list}
          columnWrapperStyle={styles.gridGap}
          contentContainerStyle={styles.gridGap}
          data={filteredPokemons}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint} /> : null
          }
          numColumns={3}
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              style={{ flex: 1 / 3 }}
            />
          )}
          keyExtractor={(item) => item.name}
          onEndReached={search ? undefined : () => fetchNextPage()}
        />
      </Card>
    </RootView>
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
    marginTop: 12,
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

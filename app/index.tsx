import { BackHandler, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemedText from "@/app/components/ThemedText";
import useThemeColor from "@/hooks/useThemeColor";
import Card from "./components/Card";

export default function Index() {
  const color = useThemeColor();
  return (
    <SafeAreaView style={[styles.container, {}]}>
      <Card>
        <ThemedText
          variant={"headline"}
          color={"grayDark"}
          style={{ padding: 10 }}
        >
          Pokedex
        </ThemedText>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
});

/* note for lesson : 
    <Link href="/about">About</Link>
      <Link href={{ pathname: "/pokemon/[id]", params: { id: 5 } }}>
        Pokemon id:5
      </Link>





*/

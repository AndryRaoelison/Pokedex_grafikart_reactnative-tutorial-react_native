import { StyleSheet, Text, View } from "react-native";
import ThemedText from "@/app/components/ThemedText";

export default function about() {
  return (
    <View style={styles.container}>
      <Text> About Jojopyun</Text>
      <ThemedText variant={"headline"}> Test Headline </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dotted",
    padding: 34,
  },
});

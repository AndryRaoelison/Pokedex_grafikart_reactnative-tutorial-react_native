import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function pokemon() {
  const localParams = useLocalSearchParams();
  return (
    <View>
      <Text>Pokemon ID : {localParams.id}</Text>
    </View>
  );
}

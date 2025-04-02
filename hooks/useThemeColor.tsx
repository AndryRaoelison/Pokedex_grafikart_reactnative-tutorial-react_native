import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function useThemeColor() {
  const theme = useColorScheme() ?? "light";
  return Colors[theme];
}

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

const useThemeColor = () => {
  const theme = useColorScheme() ?? "light";
  return Colors[theme];
};

export default useThemeColor;

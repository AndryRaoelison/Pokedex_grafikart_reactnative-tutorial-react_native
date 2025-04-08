import { Image, StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { Row } from "./Row";
import useThemeColor from "@/hooks/useThemeColor";

type Props = {
  value?: string;
  onChange: (s: string) => void;
};

export function SearchSection({ value, onChange }: Props) {
  const color = useThemeColor();
  return (
    <Row
      style={[
        {
          backgroundColor: color.grayWhite,
          paddingLeft: 8,
          paddingVertical: 4,
          borderRadius: 20,
        },
      ]}
    >
      <Image
        source={require("@/assets/images/search-icon.png")}
        style={[{ height: 24, width: 24, flex: 0 }]}
        resizeMode="contain"
      />
      <TextInput style={{ flex: 1 }} onChangeText={onChange} value={value} />
    </Row>
  );
}

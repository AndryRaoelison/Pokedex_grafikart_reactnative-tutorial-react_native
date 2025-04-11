import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";

import { Row } from "./Row";
import ThemedText from "./ThemedText";

type Props = ViewProps & {
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
};
export function PokemonSpecs({ image, title, description, style }: Props) {
  return (
    <View style={[styles.rowStyle, style]}>
      <Row>
        {image && <Image source={image} style={styles.imageStyle} />}
        <ThemedText variant="subtitle2" style={{ textTransform: "capitalize" }}>
          {title}
        </ThemedText>
      </Row>
      <ThemedText>{description}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: 14,
    width: 14,
  },
  rowStyle: {
    height: 52,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

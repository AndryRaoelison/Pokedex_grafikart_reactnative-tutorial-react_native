import useThemeColor from "@/hooks/useThemeColor";
import { useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ThemedText from "./ThemedText";
import Card from "./Card";
import { Row } from "./Row";
import { RadioButton } from "./RadioButton";
// The code bellow handle : the modal toggling and set the sorting : sort by id or sort by name of the pokemons
type Props = {
  value?: "id" | "name";
  onChange: (s: "id" | "name") => void;
};

export function SortButton({ value, onChange }: Props) {
  const [visible, setVisibility] = useState(false);
  const [position, setPosition] = useState<null | {
    top: number;
    right: number;
  }>(null);
  const buttonref = useRef<View>(null);
  const toggleModal = () => {
    buttonref.current?.measureInWindow((x, y, height, width) => {
      setPosition({
        top: height + y + 10,
        right: Dimensions.get("window").width - x - width,
      });
      setVisibility(!visible);
    });
  };
  const colors = useThemeColor();
  const options = [
    {
      label: "Number",
      value: "id",
    },
    {
      label: "Name",
      value: "name",
    },
  ] as const;
  return (
    <>
      {/* Button for chaging the sort direction */}
      <Pressable onPress={toggleModal}>
        <View
          ref={buttonref}
          style={[styles.wrapper, { backgroundColor: colors.grayWhite }]}
        >
          <Text style={{ color: colors.tint, fontSize: 20 }}>
            {value === "id" ? "#" : "A"}
          </Text>
        </View>
      </Pressable>
      {/* Modal menu allowing to select the sort type(sort by name or by id(default)) */}
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        style={{ backgroundColor: "blue" }}
        onRequestClose={toggleModal}
      >
        <Pressable style={styles.backdrop} onPress={toggleModal}></Pressable>
        <View
          style={[styles.popup, { backgroundColor: colors.tint, ...position }]}
        >
          <ThemedText variant="headline" color="grayLight">
            Sort By :
          </ThemedText>
          <Card style={[styles.card]}>
            {options.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => onChange(option.value)}
                style={{ paddingVertical: 2 }}
              >
                <Row>
                  <RadioButton checked={option.value === value} />
                  <Text style={[{ fontSize: 16, fontWeight: "500" }]}>
                    {option.label}
                  </Text>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    height: 42,
    width: 42,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popup: {
    position: "absolute",
    width: 133,
    paddingHorizontal: 6,
    paddingVertical: 10,
    gap: 12,
    borderRadius: 8,
  },
  card: {
    gap: 5,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});

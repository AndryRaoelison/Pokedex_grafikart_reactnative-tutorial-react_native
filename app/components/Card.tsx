import { Shadows } from "@/constants/Shadow";
import useThemeColor from "@/hooks/useThemeColor";
import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps;

const Card = ({ style, ...rest }: Props) => {
  const colors = useThemeColor();
  return (
    <View
      style={[styles, { backgroundColor: colors.grayWhite }, style]}
      {...rest}
    ></View>
  );
};
const styles = {
  borderRadius: 5,
  ...Shadows.dp2,
} satisfies ViewStyle;

export default Card;

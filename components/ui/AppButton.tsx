import { ReactNode } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface AppButtonProps {
  onPress: () => void;
  children: ReactNode;
  style?: ViewStyle;
  loading?: boolean;
}

export const AppButton = ({
  onPress,
  children,
  style,
  loading,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        paddingVertical: 12,
        backgroundColor: "#2563eb",
        borderWidth: 0,
        borderRadius: 4,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        width: "100%",
        marginRight: "auto",
        ...style,
      }}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator style={{ height: 20 }} color="white" />
      ) : (
        <Text style={{ color: "white" }}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

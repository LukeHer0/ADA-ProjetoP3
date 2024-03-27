import { StyleSheet, Text, View, Pressable } from "react-native";

type AlunoProps = {
  name: string;
  id: string;
  handleCardPress: () => void;
};

export function Aluno({ name, id, handleCardPress }: AlunoProps) {
  return (
    <Pressable onPress={handleCardPress}>
      <View style={styles.card}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.id}>{id}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e5e7eb",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 30,
    alignItems: "center",
    marginVertical: 12,
  },
  text: {
    fontWeight: "700",
    fontSize: 16,
  },
  id: {
    fontSize: 14,
  },
});

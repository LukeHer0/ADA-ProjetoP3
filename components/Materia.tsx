import { StyleSheet, Text, View, Pressable } from "react-native";

export function Materia({ title, teacherName, code, handleCardPress }) {
  return (
    <Pressable onPress={handleCardPress}>
    <View style={styles.materiaStyle}>
      <View>
        <Text style={styles.materiaTitle}>{title}</Text>
        <Text style={styles.baseText}>{teacherName}</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.materiaTitle}>{code}</Text>
        {/* <FeatherIcons name="chevron-down" size={30} /> */}
      </View>
    </View>
    </Pressable> 
  );
}

const styles = StyleSheet.create({
  materiaStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e5e7eb",
    width: "90%",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  baseText: {
    fontSize: 16,
    color: "#1f2937",
  },
  materiaTitle: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "bold",
  },

  leftbaseText: {
    fontSize: 16,
    color: "#1f2937",
    alignItems: "flex-end",
  },

  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },

  subTitleText: {
    fontSize: 24,
  },

  searchSection: {
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    width: "70%",
  },

  buttonStyle: {
    maxWidth: 400,
    width: "90%",
    paddingVertical: 12,
    color: "black",
    backgroundColor: "#d1d5db",
    borderWidth: 0,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  titleStyle: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 60,
    marginBottom: 30,
  },

  inputStyle: {
    marginLeft: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  inputTitle: {
    flexDirection: "column",
    alignItems: "flex-start",
    color: "d1d5db",
  },

  input: {
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 4,
    paddingVertical: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

/* eslint-disable eqeqeq */

import { useAtom } from "jotai";
import React from "react";
import { StyleSheet, Text, SafeAreaView, SectionList } from "react-native";

import ClassCardProfessor from "../../components/ClassCardProfessor";
import InfoClass from "../../components/InfoClass";
import PlusButton from "../../components/PlusButton";
import { aulasAtom } from "../../utils/aulas";

export default function Home({ navigation }) {
  const [aulas] = useAtom(aulasAtom);

  //const [modalVisible, setModalVisible] = React.useState(false);
  const [showClass, setShowClass] = React.useState(false);
  const [selectedClassId, setSelectedClassId] = React.useState<number | null>(
    null,
  );

  const handleCardPress = (id) => {
    setSelectedClassId(id);
    setShowClass(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={[
          {
            title: "31/01/24",
            data: aulas,
          },
        ]}
        renderItem={({ item }) => (
          <ClassCardProfessor
            title={item.title}
            time={item.time}
            description={item.description}
            handleCardPress={() => handleCardPress(item.id)}
            status={item.status}
            id={item.id}
          />
        )}
        renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
        keyExtractor={(a) => String(a.id)}
        style={{ marginHorizontal: 12, height: 280 }}
      />
      <InfoClass
        classId={selectedClassId}
        open={showClass}
        closeModal={() => setShowClass(false)}
      />

      <PlusButton navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 18,
    fontFamily: "sans-serif",
    color: "#1f2937",
  },

  weekButton: {
    paddingVertical: 10,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: "#f2f2f2",
    width: 76,
    alignItems: "center",
  },

  monthButton: {
    paddingVertical: 10,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: "#f2f2f2",
    width: 76,
    alignItems: "center",
  },

  buttonON: { backgroundColor: "#d9d9d9" },

  headerStyle: {
    gap: 12,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },

  gapContainer: {
    gap: 12,
    maxWidth: "90%",
    marginLeft: "5%",
    height: "100%",
  },
});

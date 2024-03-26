import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ClassCard from "../../components/ClassCard";
import { aulasAtom } from "../../utils/aulas";

const Home = () => {
  return (
    <View style={{ marginHorizontal: "7%" }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "500", padding: 12 }}>Matérias</Text>
      </View>
      <View>
        {aulasAtom.map((aula) => (
          <ClassCard
            title={aula.title}
            time={aula.time}
            description={aula.description}
            status={aula.status}
          />
        ))}
      </View>
    </View>
  );
};

export default Home;

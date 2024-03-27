import React, { useCallback, useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ClassCard from "../../components/ClassCard";
import { api } from "../../config/api";

type Subject = {
  id: number,
  created_at: Date,
  updated_at: Date,
  name: string,
  code: string,
  description: string
};

type SubjectResponse = {
  count: number,
  next: string,
  previous: string,
  results: Subject[]
};



const Home = () => {


  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const getSubjects = useCallback(async () => {
    try {
      const response = await api.get<SubjectResponse>("/classroom/subjects/");

      setSubjects(response.data.results);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSubjects();
  }, []);

  

  return (
    <ScrollView>
      <View style={{ marginHorizontal: "7%" }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: "500", padding: 12 }}>Matérias</Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "500", padding: 12 }}>Matérias cadastradas</Text>
          
            <View>
              {loading ? <Text>Carregando...</Text> : null}
                {subjects.map((materia) => (
                  <ClassCard
                    key={materia.id}
                    title={materia.name}
                    time={materia.code}
                    description={materia.description}
                    
                  />
                ))}
            </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

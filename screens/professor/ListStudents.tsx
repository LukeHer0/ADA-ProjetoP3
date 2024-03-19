import React from "react";
import { View, ScrollView } from "react-native";

import { Aluno } from "../../components/alunoComponent";
import CardAluno from "../../components/CardAluno";

const alunos = 
[
    {
        nome: "João Silva",
        id: "202111478"
    },
    {
        nome: "Jouzeh Mathews",
        id: "202111479"
    },
    {
        nome: "Cleiton do Pneu",
        id: "202111480"
    },
    {
        nome: "Cabeludo Rei da M4A1",
        id: "666"
    },
    {
        nome: "Ruan Tenorio apelaozin",
        id: "202111484"
    },
    {
        nome: "Linda Santos",
        id: "202111481"
    },
    {
        nome: "Matheus Santos",
        id: "202111482"
    },
    {
        nome: "Matheus Silva 🌹💖",
        id: "s2"
    },
    {
        nome: "Vinícius da Costa Neitzke",
        id: "00000001"
    },
];


export default function ListStudents({ navigation }: any) {
    const [showClass, setShowClass] = React.useState(false);
    const handleCardPress = () => {
        setShowClass(true);
    };
    return (
        <ScrollView>
            <View>
                <View>
                    {alunos.map((aluno) => (<Aluno name={aluno.nome} id={aluno.id} handleCardPress = {() => handleCardPress()} /> ))}
                </View>
                <CardAluno
                    open={showClass}
                    closeModal={() => setShowClass(false)}
                />
            </View>
            
        </ScrollView>
    );
}



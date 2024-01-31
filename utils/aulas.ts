import { atom } from "jotai";

/* eslint-disable prefer-const */
export const aulasAtom = atom([
  {
    id: 1,
    title: "Programação 3",
    description:
      "Introdução ao React/Next.js: Conceitos iniciais e fundamentais.",
    teacherName: "João",
    time: "19:00",
    status: "confirmed",
    local: "Laboratorio 3, IC",
  },
  {
    id: 2,
    title: "Projeto e Análise de Algoritmos",
    description: "Apresentação da disciplina",
    teacherName: "Afonso",
    time: "19:00",
    status: "confirmed",
    local: "Mini Auditório, IC",
  },
  {
    id: 3,
    title: "Circuitos Digitais",
    description: "Portas lógicas",
    teacherName: "Glauber",
    time: "19:00",
    status: "canceled",
    local: "Laboratorio 2, IC",
  },
]);

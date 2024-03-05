import { Alert } from "react-native";
import { create } from "zustand";

import storage from "../config/storage";

type StateProps = {
  token: string;
  user: null | {
    id: number;
    email: string;
    is_student: boolean;
    is_teacher: boolean;
    is_secretary: boolean;
  };
  saveToken: (token: string) => void;
  logout: () => void;
};

const defaultStudent = {
  id: 0,
  email: "",
  is_student: true,
  is_teacher: false,
  is_secretary: false,
};

export const useAuthStore = create<StateProps>((set) => ({
  token: "",
  user: null,
  saveToken: async (token: string) => {
    try {
      await storage.save({
        key: "token",
        data: token,
      });
      set({ token, user: defaultStudent });
    } catch (e) {
      Alert.alert("Erro", "Erro ao salvar token.");
    }
  },
  logout: async () => {
    // Remove token from AsyncStorage
    await storage.remove({ key: "token" });
    set({ token: "" });
  },
}));

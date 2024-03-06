import { Alert } from "react-native";
import { create } from "zustand";

import { api } from "../config/api";
import storage from "../config/storage";

type StateProps = {
  token: string;
  user: null | User;
  login: (data: LoginParams) => Promise<void>;
  logout: () => void;
};

const defaultStudent = {
  id: 0,
  email: "",
  is_student: true,
  is_teacher: false,
  is_secretary: false,
};

type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  refresh: string;
  access: string;
  is_student: boolean;
  is_teacher: boolean;
  is_secretary: boolean;
};

type User = {
  name: string;
  email: string;
  student_id: string;
};

export const useAuthStore = create<StateProps>((set) => ({
  token: "",
  user: null,

  login: async (data: LoginParams) => {
    const loginResponse = await api.post<LoginResponse>("/token/", data);

    await storage.save({
      key: "token",
      data: loginResponse.data.access,
    });

    api.defaults.headers.common.Authorization = `Bearer ${loginResponse.data.access}`;

    const profileResponse = await api.get<User>("/me");

    await storage.save({
      key: "user",
      data: profileResponse.data,
    });
  },
  logout: async () => {
    // Remove token from AsyncStorage
    await storage.remove({ key: "token" });
    set({ token: "" });
  },
}));

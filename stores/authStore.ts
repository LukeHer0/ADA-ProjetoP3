import { isAxiosError } from "axios";
import { create } from "zustand";

import { api } from "../config/api";
import storage from "../config/storage";

type StateProps = {
  token: string;
  user: null | User;
  verifyAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  login: (data: LoginParams) => Promise<void>;
  register: (data: RegisterParams) => Promise<void>;
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
12345;

type RegisterParams = {
  email: string;
  name: string;
  password: string;
  registration_id: string;
};

type User = {
  name: string;
  email: string;
  registration_id: string;
};

export const useAuthStore = create<StateProps>((set) => ({
  token: "",
  user: null,
  verifyAuth: async () => {
    try {
      const token = await storage.load({ key: "token" });

      if (token) {
        set({ token });
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const profileResponse = await api.get<User>("/me");

        console.log("profileResponse", profileResponse.data);

        if (!profileResponse.data) {
          return await storage.remove({ key: "token" });
        }

        await storage.save({
          key: "user",
          data: profileResponse.data,
        });

        set({ user: profileResponse.data });
      }
    } catch (e) {
      console.warn(e);
      await storage.remove({ key: "token" });
      await storage.remove({ key: "user" });
    }
  },
  updateProfile: async (data: Partial<User>) => {
    try {
      const response = await api.patch<User>("/me/", data);

      await storage.save({
        key: "user",
        data: response.data,
      });

      set({ user: response.data });
    } catch (e) {
      if (isAxiosError(e)) {
        console.log("error", e.response?.data);
      }
    }
  },
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

    set({ token: loginResponse.data.access, user: profileResponse.data });
  },

  register: async (data: RegisterParams) => {
    await api.post("/student/register/", data);
  },

  logout: async () => {
    // Remove token from AsyncStorage
    await storage.remove({ key: "token" });
    await storage.remove({ key: "user" });
    set({ token: "", user: null });
  },
}));

import { create } from "zustand";

const useRegisteredStore = create((set) => ({
  isRegistered: false,
  userEmail: "",
  setRegistered: (value) =>
    set((state) => ({
      isRegistered: value.registered,
      userEmail: value.email,
    })),
}));

export { useRegisteredStore };

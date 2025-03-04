import { create } from "zustand";
import { request } from "../services/request";

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("token") || null,

    login: async (email, password) => {
        try {
            const response = await request({
                url: '/login',
                method: 'post',
                data: { 
                    email,
                    password
                }
            });
            const { access_token, user } = response.data;

            localStorage.setItem("token", access_token);
            set({ user, token: access_token });

            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
    },

    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    }
}));

export default useAuthStore;

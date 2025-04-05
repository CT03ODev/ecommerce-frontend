import { create } from "zustand";
import { request } from "../services/request";

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("token") || null,

    login: async (email, password) => {
        try {
            const response = await request({
                url: '/auth/login',
                method: 'post',
                data: { 
                    email,
                    password
                }
            });
            const { access_token, user } = response;

            localStorage.setItem("token", access_token);
            set({ user, token: access_token });

            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            if (error.response?.status === 422) {
                // Handle validation errors
                return { success: false, errors: error.response.data.errors };
            }
            return { success: false, message: error.response?.data?.message || "Email or password invalid" };
        }
    },

    register: async (data) => {
        try {
            const response = await request({
                url: '/auth/register',
                method: 'post',
                data
            });
            const { access_token, user } = response;

            localStorage.setItem("token", access_token);
            set({ user, token: access_token });

            return { success: true };
        } catch (error) {
            if (error.response?.status === 422) {
                // Handle validation errors
                return { success: false, errors: error.response.data.errors };
            }
            return { success: false, message: error.response?.data?.message || "Registration failed" };
        }
    },

    logout: async () => {
        try {
            await request({
                url: '/auth/logout',
                method: 'post',
            });
            localStorage.removeItem("token");
            set({ user: null, token: null });
            return { success: true };
        } catch (error) {
            set({ user: null, token: null });
            localStorage.removeItem("token");
            return { success: false };
        }
    },

    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },

    refreshSession: async () => {
        try {
            const response = await request({
                url: '/auth/refresh',
                method: 'post',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const { access_token, user } = response;
            localStorage.setItem("token", access_token);
            set({ user, token: access_token });
            return { success: true };
        } catch (error) {
            console.error("Failed to refresh session:", error);
            set({ user: null, token: null });
            localStorage.removeItem("token");
            return { success: false };
        }
    },
}));

export default useAuthStore;

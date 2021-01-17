import api from "./api";

export const TOKEN_KEY = "jwt-token";
export const CURRENT_USER_KEY = "current-user";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
};

export const setCurrentUser = (user) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.clear();
};

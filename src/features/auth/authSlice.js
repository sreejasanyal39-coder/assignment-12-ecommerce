import { createSlice } from '@reduxjs/toolkit';

const AUTH_STORAGE_KEY = 'assignment12_auth';

const loadSavedAuth = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

const saved = loadSavedAuth();

const initialState = {
  isAuthenticated: saved ? saved.isAuthenticated : false,
  user: saved ? saved.user : null,
  loginModalOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { email, name } = action.payload || {};
      state.isAuthenticated = true;
      state.user = {
        name: name || 'Sreeja Sanyal',
        email: email || 'sreeja.sanyal@technoindia.edu.in',
        studentId: '231001102019',
        college: 'Techno India University, West Bengal',
        program: 'BCA(H)',
        avatar: '/student-id.jpg',
      };
      state.loginModalOpen = false;
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          isAuthenticated: true,
          user: state.user,
        }));
      } catch (err) {}
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (err) {}
    },
    setLoginModalOpen(state, action) {
      state.loginModalOpen = action.payload;
    }
  },
});

export const { login, logout, setLoginModalOpen } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoginModalOpen = (state) => state.auth.loginModalOpen;

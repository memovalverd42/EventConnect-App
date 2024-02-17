import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { startLogin, startRegister } from ".";
import { Token, User } from "./types";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: Token | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('authState');
    },

    setAuthState: (state, action: PayloadAction<AuthState>) => {
      const authState = action.payload;
      state.user = authState.user;
      state.isAuthenticated = authState.isAuthenticated;
      state.token = authState.token;
    },

    setNewAccessToken: (state, action: PayloadAction<string>) => {
      if (state.token) {
        state.token.access = action.payload;
        localStorage.setItem('authState', JSON.stringify(state));
      }
    },

    getSession: (state) => {
      const user = localStorage.getItem('user');
      if (user) {
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    }
  },

  extraReducers: (builder) => {

    builder
      // startLogin thunk
      .addCase( startLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( startLogin.fulfilled, (state, action) => {
        const userResponse = action.payload;
        state.loading = false;
        state.user = userResponse;
        state.token = action.payload.token;
        state.isAuthenticated = true

        localStorage.setItem('authState', JSON.stringify(state));
      })
      .addCase( startLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error logging in';
      })

      // startLogin thunk
      .addCase( startRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( startRegister.fulfilled, (state, action) => {
        const userResponse = action.payload;
        state.loading = false;
        state.user = userResponse;
        state.token = action.payload.token;
        state.isAuthenticated = true
      })
      .addCase( startRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error logging in';
      })

  },
});

export const { logout, setAuthState, setNewAccessToken } = authSlice.actions

export default authSlice.reducer;
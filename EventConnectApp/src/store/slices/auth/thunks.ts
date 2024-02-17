import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginRequest, RegisterRequest } from "../../../api";
import { registerUser, loginUser, refreshTokenUser } from "../../../api";
import { RootState } from "../..";

export const startLogin = createAsyncThunk(
  "auth/startLogin",
  async (payload: LoginRequest) => {
    return loginUser( payload );
  }
);

export const startRegister = createAsyncThunk(
  "auth/startRegister",
  async (payload: RegisterRequest) => {
    return registerUser( payload );
  }
)

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const refreshToken = state.auth.token?.refresh;
    if (!refreshToken) {
      throw new Error('No refresh token');
    } else { 
      return refreshTokenUser( refreshToken );
    }
  }
);

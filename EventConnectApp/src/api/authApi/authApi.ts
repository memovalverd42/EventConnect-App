import axios from 'axios';
import { LoginRequest, RegisterRequest, UserResponse, userResponseFromServer } from '.';

/**
 * Instancia de axios para realizar peticiones a la API de autenticación
 */
export const authApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

/**
 * Funcion para registrar un usuario
 * @param data - Datos del usuario a registrar
 */
export const registerUser = async ( data: RegisterRequest ) => {
  try {
    const response = await authApi.post<UserResponse>('/auth/register/', data);
    const responseData = userResponseFromServer(response.data);
    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Funcion para loguear un usuario
 * @param data - Datos del usuario a loguear
*/
export const loginUser = async ( data: LoginRequest ) => {
  try {
    const response = await authApi.post<UserResponse>('/auth/login/', data);
    // console.log(resp.data);
    const responseData = userResponseFromServer(response.data);
    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Funcion para refrescar el token de un usuario
 * @param refreshToken - Token de refresco
 */
export const refreshTokenUser = async ( refreshToken: string ) => {
  try {
    const response = await authApi.post<UserResponse>('/auth/refresh/', { refresh: refreshToken });
    const responseData = userResponseFromServer(response.data);
    return responseData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

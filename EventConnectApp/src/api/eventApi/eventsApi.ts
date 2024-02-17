import axios from 'axios';
import { setNewAccessToken, store } from '../../store';
import { EventResponse, EventsWithPaginationResponse, eventsResponseFromServer, refreshTokenUser } from '..';
import { getAccessToken } from '../../helpers';
import { Event } from '../../types/types';
import { getFormattedDatetime } from '../../helpers/getFormattedDatetime';

/**
 * Configura un interceptor para refrescar el token de acceso cuando se 
 * recibe un error de autorización (401 Unauthorized)
 */
export const setupTokenRefreshInterceptor = () => {
  eventsApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      // Si la respuesta es un error de autorización (401 Unauthorized)
      if (error.response && error.response.status === 401) {
        const authState = store.getState().auth;
        const refreshToken = authState.token?.refresh;

        if (refreshToken) {
          try {
            const response = await refreshTokenUser(refreshToken);
            const newAccessToken = response.token.access;

            store.dispatch( setNewAccessToken( newAccessToken ) );
            
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios.request(error.config);

          } catch (refreshError) {
            console.log('Error al refrescar el token de acceso:', refreshError);
          }
        }
      }
      
      // Si el error no es un error de autorización o no se puede refrescar el token
      return Promise.reject(error);
    }
  );
};

/**
 * Instancia de axios para realizar peticiones a la API de eventos
 */
export const eventsApi = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

setupTokenRefreshInterceptor();

/**
 * Realiza una petición para obtener todos los eventos
 */
export const getAllEventsRequest = async ( page = 1 ) => {
  try {
    const response = await eventsApi.get<EventsWithPaginationResponse>(`/events/?page=${ page }`, { headers: getAccessToken()! });
    return eventsResponseFromServer(response.data.results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Realiza una petición para obtener los eventos suscritos por el usuario
 */
export const getSubscribedEventsRequest = async () => {
  try {
    const response = await eventsApi.get<EventsWithPaginationResponse>('/events/subscribed_events/', { headers: getAccessToken()! });
    return eventsResponseFromServer(response.data.results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Realiza una petición para obtener los eventos creados por el usuario
 */
export const getUserEventsRequest = async () => {
  try {
    const response = await eventsApi.get<EventsWithPaginationResponse>('/events/created_events/', { headers: getAccessToken()! });
    return eventsResponseFromServer(response.data.results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Realiza una petición para crear un evento
 */
export const createEventRequest = async (formData: FormData) => {
  try {
    await eventsApi.post<EventResponse>('/events/', formData, { headers: getAccessToken()! });
    // console.log(resp.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Realiza una petición para editar un evento
 */
export const editEventRequest = async (eventId: number, formData: FormData) => {
  try {
    await eventsApi.patch<EventResponse>(`/events/${eventId}/`, formData, { headers: getAccessToken()! });
    // console.log(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Realiza una petición para eliminar un evento
 */
export const deleteEventRequest = async (eventId: number) => {
  try {
    await eventsApi.delete(`/events/${eventId}/`, { headers: getAccessToken()! });
    // console.log(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Realiza una petición para obtener un evento
 */
export const getEventByIdRequest = async ( eventId: number ) => {
  try {
    const response = await eventsApi.get<EventResponse>(`/events/${eventId}/`, { headers: getAccessToken()! });
    const data: Event = {
      ...response.data,
      date: getFormattedDatetime(response.data.date),
      assistantsCount: response.data.assistants_count,
      createdBy: response.data.created_by,
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Realiza una petición para desuscribirse a un evento
 */
export const unsubscribeEventRequest = async (eventId: number) => {
  try {
    await eventsApi.post(`/events/${eventId}/unsubscribe/`, {}, { headers: getAccessToken()! });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Realiza una petición para suscribirse a un evento
*/
export const subscribeEventRequest = async (eventId: number) => {
  try {
    await eventsApi.post(`/events/${eventId}/subscribe/`, {}, { headers: getAccessToken()! });
    // console.log(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
import { store } from "../store";


export const getAccessToken = () => {
  const authState = store.getState().auth;
  if (authState.token) {
    return { Authorization: `Bearer ${authState.token.access}` }
  }
  return null;
}
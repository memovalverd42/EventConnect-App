import { RegisterData, User } from "../../store/slices/auth/types";
import { UserResponse } from "./types";

export const registerRequestToServer = ( resgisterRequest: RegisterData ) => {
  const {
    email,
    password,
    firstName,  
    lastName,   
  } = resgisterRequest;

  return {
    email,
    password,
    first_name: firstName,  
    last_name: lastName,   
  }
}

export const userResponseFromServer = ( userResponse: UserResponse ): User => {
  const {
    id,
    email,
    first_name,  
    last_name,
    token,   
  } = userResponse;

  return {
    id,
    email,
    firstName: first_name,  
    lastName: last_name,
    token   
  }
}
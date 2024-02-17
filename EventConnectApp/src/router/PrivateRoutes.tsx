import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";


interface PrivateRoutesProps {
  children: JSX.Element | JSX.Element[];
}

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return ( isAuthenticated ) ? children : <Navigate to="/auth/" />;
}
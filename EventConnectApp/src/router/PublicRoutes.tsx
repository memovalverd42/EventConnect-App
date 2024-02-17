import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";


interface PublicRoutesProps {
  children: JSX.Element | JSX.Element[];
}

export const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return ( !isAuthenticated ) ? children : <Navigate to="/*" />;
}
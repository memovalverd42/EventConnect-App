import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { AppRoutes } from "../app/routes/AppRoutes"
import { PublicRoutes } from "./PublicRoutes"
import { PrivateRoutes } from "./PrivateRoutes"
import { useAppDispatch } from "../hooks"
import { useEffect } from "react"
import { setAuthState } from "../store"

export const AppRouter = () => {

  const dispatch = useAppDispatch();

  // Verificar si hay un estado guardado en el almacenamiento local al cargar la aplicación
  useEffect(() => {
    const savedState = localStorage.getItem('authState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      dispatch( setAuthState(parsedState) );
    }
  }, [dispatch]);


  return (
    <>
      <Routes>
          {/* Login y registro */}
          <Route 
            path="auth/*" 
            element={ 
              <PublicRoutes>
                <AuthRoutes/> 
              </PublicRoutes>
            }
          />

          {/* EventConnect App */}
          <Route 
            path="/*" 
            element={ 
              <PrivateRoutes>
                <AppRoutes/> 
              </PrivateRoutes>
            }
          />
      </Routes>
    </>
  )
}

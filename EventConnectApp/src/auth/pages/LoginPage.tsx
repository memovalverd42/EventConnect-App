import {Button, Input, Link} from "@nextui-org/react";
import { AuthLayout } from "../layout/AuthLayout"
import { useAppDispatch, useAppSelector, useForm } from "../../hooks";
import { FormEvent } from "react";
import { startLogin } from "../../store";
import { Navigate } from "react-router-dom";
import { LoginRequest } from "../../api/authApi/types";

export const LoginPage = () => {

  const dispatch = useAppDispatch();

  const { loading, isAuthenticated } = useAppSelector(state => state.auth);

  const { email, password, onInputChange, formState } = useForm<LoginRequest>(
    {email: '', password: ''}
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(startLogin(formState));
  }

  if( isAuthenticated ) {
    return <Navigate to="/all-events" />;
  }

  return (
    <AuthLayout title="Bienvenido" >
      <form onSubmit={ onSubmit } >
        <div className="flex flex-col w-full gap-4">
          <Input
            label="Email"
            type="email"

            name="email"
            value={ email }
            onChange={ onInputChange }
          />
          
          <Input
            label="Password"
            type="password"

            name="password"
            value={ password }
            onChange={ onInputChange }
          />

          <div className="flex justify-center">
            <Button 
              type="submit" 
              variant="solid" 
              className="w-40"
              color="primary"
              isLoading={ loading }
              onClick={ onSubmit }
            >
              Inciar sesión
            </Button>
          </div>

          <div className="mt-2 text-sm text-end">
            <Link href="/auth/register">
              Crear cuenta
            </Link>
          </div>

        </div>
      </form>
    </AuthLayout>
  )
}

import {Button, Input, Link} from "@nextui-org/react";
import { AuthLayout } from "../layout/AuthLayout"
import { useAppDispatch, useAppSelector, useForm } from "../../hooks";
import { FormEvent } from "react";
import { startRegister } from "../../store";
import { Navigate } from "react-router-dom";
import { RegisterData } from "../../store/slices/auth/types";
import { registerRequestToServer } from "../../api/authApi/authMapper";

export const RegisterPage = () => {

  const dispatch = useAppDispatch();

  const { loading, isAuthenticated } = useAppSelector(state => state.auth);

  const { firstName, lastName, email, password, onInputChange, formState } = useForm<RegisterData>(
    {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const requestData = registerRequestToServer(formState);
    dispatch( startRegister(requestData) );
  }

  if( isAuthenticated ) {
    return <Navigate to="/all-events" />;
  }

  return (
    <AuthLayout title="Crea una cuenta" >
      <form onSubmit={ onSubmit }>
        <div className="flex flex-col w-full gap-4">
          <Input
            type="Text"
            label="Nombre"

            name="firstName"
            value={ firstName }
            onChange={ onInputChange }
          />
          <Input
            type="Text"
            label="Apellidos"

            name="lastName"
            value={ lastName }
            onChange={ onInputChange }
          />
          <Input
            type="email"
            label="Email"

            name="email"
            value={ email }
            onChange={ onInputChange }
          />
          <Input
            type="password"
            label="Password"

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
              Crear cuenta
            </Button>
          </div>

          <div className="mt-2 text-sm text-end">
            <Link href="/auth/login">
              ¿Ya tienes una cuenta?
            </Link>
          </div>

        </div>
      </form>
    </AuthLayout>
  )
}

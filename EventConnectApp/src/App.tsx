// import { NavbarSite } from "./components/Navbar";
import { NextUIProvider } from '@nextui-org/react';
import { AppRouter } from './router/AppRouter';
import { useNavigate } from 'react-router-dom';


export const App = () => {

  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={ navigate } >
      <AppRouter/>
    </NextUIProvider>
  );
}


import { Link, NavbarItem } from "@nextui-org/react";
import { useLocation } from "react-router-dom";

export const NavbarMenuItems = () => {
  const route = useLocation();

  return (
    <>
      <NavbarItem isActive={route.pathname === "/my-events"}>
        <Link
          href="/my-events"
          color={route.pathname === "/my-events" ? "primary" : "foreground"}
          className="font-semibold text-lg"
        >
          Mis Eventos
        </Link>
      </NavbarItem>
      <NavbarItem isActive={route.pathname === "/all-events"}>
        <Link
          href="/all-events"
          color={route.pathname === "/all-events" ? "primary" : "foreground"}
          className="font-semibold text-lg"
        >
          Todos los eventos
        </Link>
      </NavbarItem>
      <NavbarItem isActive={route.pathname === "/my-assistance"}>
        <Link
          href="/my-assistance"
          color={route.pathname === "/my-assistance" ? "primary" : "foreground"}
          className="font-semibold text-lg"
        >
          Asistencias
        </Link>
      </NavbarItem>
    </>
  );
};

import { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent,NavbarMenuToggle, NavbarMenu, Link, DropdownMenu, Dropdown, DropdownItem, DropdownTrigger, Avatar, Button} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../store";
import { useNavigate } from "react-router-dom";
import { NavbarMenuItems } from ".";


export const NavbarSite = () => {

  const navigate = useNavigate();
  const dispacth = useAppDispatch();
  const { user } = useAppSelector( state => state.auth );
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = () => {
    dispacth( logout() );
    navigate('/auth/login');
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>

      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-xl text-inherit">EventConnect</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarMenuItems/>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        
        <Button as={Link} color="primary" href="/create-event" variant="flat">
          Crear evento
        </Button>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" textValue="Bienvenido">
              <p className="font-semibold">Bienvenido</p>
              <p className="font-semibold">{ `${user?.firstName} ${user?.lastName}` }</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={ onLogout } textValue="Cerrar Sesión">
                <p>Cerrar Sesión</p>
            </DropdownItem>
          </DropdownMenu>

        </Dropdown>

      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItems/>
      </NavbarMenu>

    </Navbar>
  );
}


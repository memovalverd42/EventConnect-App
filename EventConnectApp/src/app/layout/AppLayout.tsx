import { FC } from "react"
import { NavbarSite } from "../components"

interface AppLayouProps {
    children: JSX.Element | JSX.Element[]
}

export const AppLayout: FC<AppLayouProps> = ({ children }) => {
  return (
    <>
        <NavbarSite/>
        <main className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8">
            { children }
        </main>
    </>
  )
}

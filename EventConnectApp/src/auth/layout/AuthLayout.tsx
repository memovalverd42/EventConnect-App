import { Card, CardBody, CardHeader, Divider} from "@nextui-org/react"
import { FC } from "react"

interface AuthLayoutProps {
    children: JSX.Element | JSX.Element[],
    title: string
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="px-5">
          <CardHeader className="flex gap-3 items-center justify-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-center">{title}</h1>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>{children}</CardBody>
        </Card>
      </div>
    </section>
  )
}

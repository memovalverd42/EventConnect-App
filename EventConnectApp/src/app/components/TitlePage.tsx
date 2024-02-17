import { FC } from "react"

interface TitlePageProps {
    title: string
}

export const TitlePage: FC<TitlePageProps> = ({ title }) => {
  return (
    <h1 className="text-center font-bold text-4xl pb-3">
        { title }
    </h1>
  )
}

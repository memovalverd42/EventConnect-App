import { Card, CardBody, CardHeader, Link, Image } from "@nextui-org/react";
import { FC } from "react";
import { Event } from "../../types/types";


export const EventCard: FC<Event> = ({ ...props }) => {

  const { id, name, date, assistantsCount, image } = props;

  return (
    <Card className="h-[400px] py-4 flex flex-col justify-center">

      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="uppercase font-bold text-sm">{date}</p>
        <small className="pt-1 text-default-500 text-small">
          Asistentes: {assistantsCount}
        </small>

        <h3 className="font-bold">
          <Link href={`/envent/${id}`} className="text-2xl">
            {name}
          </Link>
        </h3>
      </CardHeader>

      <CardBody className="overflow-visible py-2 flex justify-center items-center">
        <div className="w-full max-h-[300px] overflow-hidden">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={image}
          />
        </div>
      </CardBody>
    
    </Card>
  );
};

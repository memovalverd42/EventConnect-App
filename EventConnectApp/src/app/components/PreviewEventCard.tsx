import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { FC } from "react";

export interface PreviewEventCard {
  eventName: string;
  datetime: string;
  coverImg: string;
  description: string;
}

export const PreviewEventCard: FC<PreviewEventCard> = ({ ...props }) => {

  const { eventName, datetime, description, coverImg } = props;
 
  return (
    <div className="pt-3">
      <Card className="py-4">

        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="uppercase font-bold text-sm">{ datetime }</p>
          <h3 className="font-bold text-2xl">{ eventName }</h3>
        </CardHeader>

        <CardBody className="overflow-visible py-2">
          <div className="w-full">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full"
              src={ coverImg }
            />
            <p className="p-2">
              { description }
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

import { AppLayout } from "../layout/AppLayout";
import { Divider, Image} from "@nextui-org/react";
import { EventDetailCard, TitlePage } from "../components";
import { useState } from "react";

// const cardData = {
//   eventName: "Taller de Marketing",
//   description: "El mejor taller de marketing de la zona, para que te cultives un poco mi brother.",
//   datetime: "26 Feb 2024 | 12:00 Hrs",
//   url: "#",
//   publisher: "Guillermo",
//   assistants: 15,
//   interested: 15
// }

export const EventPage = () => {

  const [imageAndAbout, setImageAndAbout] = useState({about: '', image: ''})

  return (
    <AppLayout>
      <TitlePage title="Detalles del Evento" />
      <div className="pt-5 grid gap-10 md:grid-cols-2 lg:gap-10">
        <div className="w-full">
          <Image
            // width={600}
            alt="NextUI hero Image"
            // src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            src={ imageAndAbout.image }
          />
        </div>

        <EventDetailCard setImageAndAbout={ setImageAndAbout }/>

      </div>

      <div className="flex justify-center m-5">
        <div className="max-w-screen-xl w-full">
          <h2 className="pb-2 text-center font-bold text-2xl">
            Sobre el evento
          </h2>
          <Divider />
          <p className="p-3 m-3 overflow-y-auto h-auto">
            {imageAndAbout.about}
          </p>
          <Divider />
        </div>
      </div>
    </AppLayout>
  );
};

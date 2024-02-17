import { AppLayout } from "../layout/AppLayout";
import { CreateEventForm, PreviewEventCard, TitlePage } from "../components";
import { useState } from "react";

const cardData = {
  eventName: "Taller de Marketing",
  datetime: "23 Feb 2024 | 12:00 hrs.",
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore soluta atque assumenda quae itaque ullam perferendis, eligendi natus distinctio exercitationem velit tempora labore molestias sapiente? Commodi ipsum rerum voluptatum? Voluptatibus?",
  coverImg: "/src/assets/images/hero.jpeg",
}

export const CreateEvent = () => {

  const [previewData, setPreviewData] = useState(cardData);

  return (
    <AppLayout>
      <TitlePage title="Crea tu Evento" />
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
        
        <CreateEventForm setPreviewData={ setPreviewData } />

        <PreviewEventCard { ...previewData } />

      </div>
    </AppLayout>
  );
};

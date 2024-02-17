import { AppLayout } from "../layout/AppLayout";
import { EditEventForm, PreviewEventCard, TitlePage } from "../components";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";

const cardData = {
  eventName: "Taller de Marketing",
  datetime: "23 Feb 2024 | 12:00 hrs.",
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore soluta atque assumenda quae itaque ullam perferendis, eligendi natus distinctio exercitationem velit tempora labore molestias sapiente? Commodi ipsum rerum voluptatum? Voluptatibus?",
  coverImg: "/src/assets/images/hero.jpeg",
}

export const EditEvent = () => {

  const { eventId } = useParams<"eventId">();
  const [previewData, setPreviewData] = useState(cardData);
  
  const { allEvents } = useAppSelector( state => state.events );
  const event = useMemo(() => allEvents.find( event => event?.id === parseInt(eventId!) ), [ eventId, allEvents]);

  return (
    <AppLayout>
      <TitlePage title="Editar Evento" />
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
        
        <EditEventForm event={ event! } setPreviewData={ setPreviewData }  />

        <PreviewEventCard { ...previewData } />

      </div>
    </AppLayout>
  );
};

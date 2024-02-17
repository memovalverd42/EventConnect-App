import { AppLayout } from "../layout/AppLayout";
import { EventCard, TitlePage } from "../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { EventsState, getSubscribedEvents } from "../../store";

// const cardData = {
//   eventName: "Taller de Marketing",
//   datetime: "23 Feb 2024 | 12:00 hrs.",
//   assistants: 15,
//   coverImg: "/src/assets/images/hero.jpeg",
// }

export const AssistancePage = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch( getSubscribedEvents() )
  }, [dispatch]);

  const { subscribedEvents } = useAppSelector<EventsState>(state => state.events);

  return (
    <AppLayout>

      <TitlePage title="Mis asistencias a eventos" />

      <div className="grid gap-10 md:grid-cols-3 lg:gap-10 pt-6">
        
        {
          subscribedEvents.map((event) => (
            <EventCard
              key={ event.id }
              { ...event }
            />
          ))
        }

      </div>
    </AppLayout>
  );
};

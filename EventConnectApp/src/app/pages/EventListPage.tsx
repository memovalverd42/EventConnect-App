import { AppLayout } from "../layout/AppLayout";
import { EventCard, TitlePage } from "../components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { EventsState, getAllEvents, getSubscribedEvents, getUserEvents } from "../../store";
import { Pagination } from "@nextui-org/react";

export const EventListPage = () => {

  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch( getAllEvents(page) );
    dispatch( getUserEvents() );
    dispatch( getSubscribedEvents() );
  }, [dispatch, page]);

  const { allEvents } = useAppSelector<EventsState>(state => state.events);

  return (
    <AppLayout>

      <TitlePage title="Todos los eventos" />

      <div className="grid gap-10 md:grid-cols-3 lg:gap-10 pt-6">
        
        {
          allEvents.map((event) => (
            <EventCard
              key={ event.id }
              { ...event }
            />
          ))
        }

      </div>
      <div className="flex justify-center mt-10">
        <Pagination 
          showControls 
          total={10} 
          initialPage={1} 
          onChange={(page) => setPage(page)}
        />
      </div>
    </AppLayout>
  );
};

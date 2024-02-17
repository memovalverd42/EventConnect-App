import { AppLayout } from "../layout/AppLayout";
import { EventCard } from "../components";
import { TitlePage } from '../components/TitlePage';
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { useEffect } from "react";
import { EventsState, getUserEvents } from "../../store";


export const MyEventPage = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch( getUserEvents() )
  }, [dispatch]);

  const { userEvents } = useAppSelector<EventsState>(state => state.events);
  
  // console.log(userEvents);

  return (
    <AppLayout>

      <TitlePage title="Mis eventos creados" />
      <div className="grid gap-10 md:grid-cols-3 lg:gap-10 pt-6">

        {
          userEvents.map((event) => (
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

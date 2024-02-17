import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import {
  DatetimeIcon,
  MdiLocation,
  UserIcon,
  UsersIcon,
} from "../ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Event } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getEventByIdRequest, subscribeEventRequest, unsubscribeEventRequest } from "../../api/eventApi/eventsApi";
import { useEffect, useState } from "react";
import { getSubscribedEvents } from "../../store";

interface imageAndAbout {
  about: string;
  image: string;
}

interface EventDetailCardProps {
  setImageAndAbout: (data: imageAndAbout ) => void;
}

export const EventDetailCard = ( { setImageAndAbout }: EventDetailCardProps ) => {

  const navigate = useNavigate();
  const { eventId } = useParams<"eventId">();

  const { user } = useAppSelector(state => state.auth);
  const { subscribedEvents } = useAppSelector(state => state.events);
  const dispatch = useAppDispatch();

  const [event, setEvent] = useState<Event | null>(null);

  const isUserEvent = event?.createdBy?.id === user?.id;
  const isSubscribed = subscribedEvents.some(subscribedEvent => subscribedEvent.id === event?.id);

  useEffect(() => {
    if (event) {
      setImageAndAbout({
        about: event.about,
        image: event.image || "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
      });
    }
  }, [event, setImageAndAbout]);
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventByIdRequest( parseInt(eventId!) );
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    
    fetchEvent();
    
    return () => {
      setEvent(null);
    };
  }, [eventId]);
  
  
  const onEditClick = () => {
    navigate(`/edit-event/${eventId}`);
  }

  const onAssistClick = async() => {
    await subscribeEventRequest( parseInt(eventId!) );
    if (event) {
      setEvent({
        ...event,
        assistantsCount: event.assistantsCount + 1
      });
    }
    await dispatch( getSubscribedEvents() );
  }
  
  const onUnsubscribeClick = async() => {
    await unsubscribeEventRequest( parseInt(eventId!) );
    if (event) {
      setEvent({
        ...event,
        assistantsCount: event.assistantsCount - 1
      });
    }
    dispatch( getSubscribedEvents() );
  }

  return (
    <div className="w-full">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{ event?.name }</p>
          </div>
        </CardHeader>

        <Divider />
        
        <CardBody>
          <p className="p-1">
            { event?.description }
          </p>

          <div className="flex items-center gap-1 p-1">
            <DatetimeIcon />
            <p className="text-small">{ event?.date }</p>
          </div>

          <div className="flex items-center gap-1 p-1">
            <MdiLocation />
            <Link
              className="text-small"
              isExternal
              showAnchorIcon
              href={ event?.location }
            >
              Zoom.com
            </Link>
          </div>

          <div className="flex items-center gap-1 p-1">
            <UserIcon />
            <p className="text-small">{ `${event?.createdBy?.first_name}` }</p>
          </div>

          <div className="flex items-center gap-1 p-1">
            <UsersIcon />
            <p className="text-small">{ event?.assistantsCount } Asistentes</p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex items-center">
            {
              isSubscribed ? (
                <Button
                  href="#"
                  className="mr-2"
                  as={Link}
                  color="danger"
                  variant="solid"
                  onClick={ onUnsubscribeClick }
                >
                  No asistiré
                </Button>
              ) : (
                <Button
                  href="#"
                  className="mr-2"
                  as={Link}
                  color="primary"
                  variant="solid"
                  onClick={ onAssistClick }
                >
                  Asistiré
                </Button>
              )
            }

            {isUserEvent && (
              <Button color="warning" onClick={ onEditClick }>Editar</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

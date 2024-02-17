import { EventResponse } from ".";
import { getFormattedDatetime } from "../../helpers/getFormattedDatetime";
import { Event } from "../../types/types";

export const eventMapper = ( event: EventResponse ): Event => {
  return {
    id: event.id,
    name: event.name,
    date: getFormattedDatetime( event.date ),
    location: event.location,
    description: event.description,
    image: event.image,
    about: event.about,
    assistantsCount: event.assistants_count,
    createdBy: event.created_by
  };
}

export const eventsResponseFromServer = (eventsResponse: EventResponse[]): Event[] => {
  return eventsResponse.map<Event>((event) => {
    return eventMapper(event);
  });
};
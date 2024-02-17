import { useEffect, useState } from "react";
import { Event } from "../types/types";

export const useIsUserEvent = (userId: number, events: Event[]) => {
  
  const [isUserEvent, setIsUserEvent] = useState<boolean>(false);

  useEffect(() => {
    const found = events.some(event => event?.created_by?.id === userId);
    setIsUserEvent(found);
  }, [userId, events]);

  return isUserEvent;

}
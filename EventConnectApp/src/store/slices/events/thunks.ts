import { createAsyncThunk } from '@reduxjs/toolkit';
import { createEventRequest, 
         deleteEventRequest, 
         editEventRequest, 
         getAllEventsRequest, 
         getSubscribedEventsRequest, 
         getUserEventsRequest } from '../../../api/eventApi';

export const getUserEvents = createAsyncThunk(
  "events/getUserEvents",
  async () => {
    return getUserEventsRequest();
  }
)

export const getSubscribedEvents = createAsyncThunk(
  "events/getSubscribedEvents",
  async () => {
    return getSubscribedEventsRequest();
  }
);

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async ( page:number = 1 ) => {
    return getAllEventsRequest( page );
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (formData: FormData) => {
    return createEventRequest( formData );
  }
);

export const editEvent = createAsyncThunk(
  "events/editEvent",
  async ({ eventId, formData }: { eventId: number, formData: FormData }) => {    
    return editEventRequest(eventId, formData);
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId: number) => {
    return deleteEventRequest( eventId );
  }
);

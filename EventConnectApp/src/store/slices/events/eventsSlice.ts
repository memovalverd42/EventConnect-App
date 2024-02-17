import { createSlice } from "@reduxjs/toolkit";
import { createEvent, editEvent, getAllEvents, getSubscribedEvents, getUserEvents } from './thunks';
import { Event } from "../../../types/types";

export interface EventsState {
  userEvents: Event[];
  allEvents: Event[];
  subscribedEvents: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  userEvents: [],
  allEvents: [],
  subscribedEvents: [],
  loading: false,
  error: null,
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // allEvents thunk
      .addCase( getAllEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( getAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.allEvents = action.payload;
      })
      .addCase( getAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching events';
      })

      // userEvents thunk
      .addCase( getUserEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( getUserEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.userEvents = action.payload;
      })
      .addCase( getUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching events';
      })

      // subscribedEvents thunk
      .addCase( getSubscribedEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( getSubscribedEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribedEvents = action.payload;
      })
      .addCase( getSubscribedEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching events';
      })

      // createEvent thunk
      .addCase( createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( createEvent.fulfilled, (state) => {
        state.loading = false;
        // state.userEvents.push(action.payload);
      })
      .addCase( createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error creating event';
      })

      // editEvent thunk
      .addCase( editEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( editEvent.fulfilled, (state) => {
        state.loading = false;
        // state.userEvents.push(action.payload);
      })
      .addCase( editEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error creating event';
      })
  },
});

export default eventsSlice.reducer;
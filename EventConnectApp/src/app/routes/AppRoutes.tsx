import { Navigate, Route, Routes } from "react-router-dom"
import { MyEventPage, AssistancePage, EventListPage, EventPage, CreateEvent, EditEvent } from '../pages';

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/my-events" element={ <MyEventPage/> } />
        <Route path="/all-events" element={ <EventListPage/> } />
        <Route path="/my-assistance" element={ <AssistancePage/> } />
        <Route path="/envent/:eventId" element={ <EventPage/> } />
        <Route path="/create-event" element={ <CreateEvent/> } />
        <Route path="/edit-event/:eventId" element={ <EditEvent/> } />
        <Route path="/*" element={ <Navigate to="/all-events" /> }/>
    </Routes>
  )
}

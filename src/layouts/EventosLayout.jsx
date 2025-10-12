import { Outlet } from "react-router-dom";
import { EventosProvider } from "../context/EventosContext";

export function EventosLayout() {
  return (
    <EventosProvider>
      <Outlet />
    </EventosProvider>
  );
}
import { HomeEventCarousel } from "../components/Home/main/HomeEventCarrusel";
import {HomeApp} from "../components/Home/main/HomeApp";
import {HomeEventList} from "../components/Home/main/HomeEventList"
import {HomeWeb} from "../components/Home/main/HomeWeb";
import { PublicFooter } from "../components/Home/PublicFooter";
import { PublicHeader } from "../components/Home/PublicHeader";
import { useEventosList } from "../hooks/useEventosList";
import { useEffect } from "react";

export default function Home() {
  const { getAllEvents, allEvents } = useEventosList();

  useEffect(() => {
    getAllEvents();
      // eslint-disable-next-line
  }, []);

  return (
    <div className="relative flex flex-col bg-[#05081b] min-h-screen scrollbar-dark">
      <PublicHeader />
      <HomeEventCarousel eventos={allEvents} />
      <HomeEventList eventos={allEvents} />
      <HomeApp/>
      <HomeWeb />

      <PublicFooter />
    </div>
  );
}


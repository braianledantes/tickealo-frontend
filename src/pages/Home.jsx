import { lazy, Suspense, useEffect } from "react";
import { PublicFooter } from "../components/Home/PublicFooter";
import { PublicHeader } from "../components/Home/PublicHeader";
import { useEventosList } from "../hooks/useEventosList";

const HomeEventCarousel = lazy(() => import("../components/Home/main/HomeEventCarrusel"));
const HomeApp = lazy(() => import("../components/Home/main/HomeApp"));
const HomeEventosProximos = lazy(() => import("../components/Home/main/HomeEventosProximos"));
const HomeEventosFinalizados = lazy(() => import("../components/Home/main/HomeEventosFinalizados"));
const HomeWeb = lazy(() => import("../components/Home/main/HomeWeb"));

export default function Home() {
  const { getAllEvents, allEvents, eventosPasados } = useEventosList();

  useEffect(() => {
    getAllEvents();
      // eslint-disable-next-line
  }, []);

  return (
    <div className="relative flex flex-col bg-[#05081b] min-h-screen scrollbar-dark">
      <PublicHeader />
      <Suspense fallback={<div className="w-full h-[400px] bg-[#10142b] animate-pulse" />}> <HomeEventCarousel eventos={allEvents} /> </Suspense>
      <Suspense fallback={<div className="min-h-[700px] w-full flex items-center justify-center"><div className="w-[350px] h-[450px] bg-[#10142b] animate-pulse rounded-2xl" /></div>}>
        <HomeEventosProximos eventos={allEvents} />
      </Suspense>
      <Suspense fallback={<div className="min-h-[700px] w-full flex items-center justify-center"><div className="w-[350px] h-[450px] bg-[#10142b] animate-pulse rounded-2xl" /></div>}>
        <HomeEventosFinalizados eventos={eventosPasados} />
      </Suspense>
      <Suspense fallback={<div className="w-full h-[400px] bg-[#10142b] animate-pulse" />}> <HomeApp /> </Suspense>
      <Suspense fallback={<div className="w-full h-[400px] bg-[#10142b] animate-pulse" />}> <HomeWeb /> </Suspense>
      <PublicFooter />
    </div>
  );
}


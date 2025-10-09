import { HomeEventCard } from "../components/HomeEventCard";
import { PublicFooter } from "../components/PublicFooter";
import { PublicHeader } from "../components/PublicHeader";

export default function Home() {
  const events = [
    {
      title: "Ruca Che",
      description: "Sede de grandes eventos deportivos y musicales, albergando desde partidos de alto nivel y competencias internacionales hasta recitales de reconocidos artistas.",
      imageUrl: "https://estadiosdeargentina.com.ar/wp-content/uploads/2014/02/estadio-ruca-che-neuquen2-1.jpg",
    },
    {
      title: "Casino Magic",
      description: "Presenta una agenda vibrante de espectáculos en vivo, que combina conciertos de artistas nacionales e internacionales, shows teatrales y propuestas culturales de primer nivel.", 
      imageUrl: "https://imagenesyogonet.b-cdn.net/data/imagenes/2024/08/19/67020/1724070689-casino-magic-centenario-neuquen-02.jpg"
    },
    {
      title: "Antares",
      description: "Antares Neuquén alberga Musiquita Experience, un ciclo de música electrónica con talentos emergentes y consagrados.",
      imageUrl: "https://neuquenalinstante-s2.cdn.net.ar/st2i1700/2023/04/neuquenalinstante2/images/44/76/447622_c487de37ff1e252356c571f1b25a0e8d3dbaafc7a1f013ddd7ffc65f15b4ca00/sm.jpg"
    },
    {
      title: "SportTech",
      description: "SportTech y Tikzet transformaron la Copa del Mundo de Taekwon-Do ITF “Mar del Plata 2024” con tecnología innovadora.",
      imageUrl: "https://framerusercontent.com/images/KFsyMKPw72LxNCbjJ3SdH5aU.png"
    }
  ];

  return (
    <div className="flex flex-col bg-[#05081b] min-h-screen">
      <PublicHeader />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-4">
        <h2 className="text-2xl md:text-3xl font-semibold racking-wider text-white mb-2 text-center">
          CLIENTES
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-8 text-white/70">
          Descubrí eventos que se realizaron mediante nuestra <span className="font-bold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#03055F]  to-[#00B4D8]">TICKETERA QR</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <HomeEventCard 
              key={index}
              title={event.title}
              description={event.description}
              imageUrl={event.imageUrl}
            />
          ))}
        </div>
      </main>      

      <PublicFooter />
    </div>
  );
}

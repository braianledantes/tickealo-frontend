import { useEffect, useRef, useState } from "react";
import mobile from "../../../assets/mobile.webp";
import { AppStoreIcon, PlaystoreIcon } from "../Icons";

export default function HomeApp() {
  const appRef = useRef(null);

  const features = [
    "COMPRAR ENTRADAS",
    "GUARDAR TUS EVENTOS FAVORITOS",
    "CONTAR TUS EXPERIENCIAS",
    "SEGUIR ORGANIZADORES",
    "TRANSFERIR ENTRADAS",
    "GANAR PREMIOS Y MUCHO MÁS!",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = features[currentIndex];

    const typingSpeed = isDeleting ? 50 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentText.slice(0, displayText.length + 1);
        setDisplayText(nextText);

        if (nextText === currentText) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        const nextText = currentText.slice(0, displayText.length - 1);
        setDisplayText(nextText);

        if (nextText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % features.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  useEffect(() => {
    const el = appRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fadeUp");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
  }, []);

  return (
    <div
      ref={appRef}
      className="
        opacity-0
        grid grid-cols-1 md:grid-cols-2
        items-center gap-8
        pt-5 pb-10
        mx-10 md:mx-40
        transition-all duration-700 ease-out
      "
    >
      {/* Texto */}
      <div className="text-center md:text-left px-6">
        <h1 className="animate-subtitle text-2xl md:text-3xl font-semibold tracking-wider text-[#999]/70 mb-5 italic">
          PARA CLIENTES
        </h1>
        <h2 className="animate-subtitle text-2xl md:text-3xl font-semibold tracking-wider text-white mb-5 italic">
          EN NUESTRA APP PODRÁS
        </h2>
        <span
            className="
                animate-title
                font-bold 
                text-transparent 
                bg-clip-text 
                bg-gradient-to-r 
                from-[#03055F] to-[#00B4D8]
                text-xs md:text-xl
                tracking-wide
                italic
                pr-2
                whitespace-nowrap
                min-w-[200px] md:min-w-[350px] inline-block
            "
        >
            {displayText}
        </span>
        <p className="animate-subtitle max-w-2xl my-5 text-white/70 tracking-wider italic text-xs md:text-sm">
          Todo en un solo lugar, pensado para que uses la plataforma de forma simple, rápida y sin vueltas. Descarga Tickealo y disfruta al máximo de todo lo que te rodea. ¿Listo para empezar?
        </p>

        <div className="animate-subtitle my-5 text-white/70 tracking-wider flex justify-center md:justify-start items-center space-x-4">
            <button className="border-white rounded-full border px-4 py-2 md:px-6 md:py-3 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#03055F] hover:to-[#00B4D8] hover:border-transparent" >
                <PlaystoreIcon size={18} />
                <span className="text-white font-medium text-sm md:text-md">Playstore</span>
            </button>

            <button className="border-white rounded-full border px-4 py-2 md:px-6 md:py-3 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#03055F] hover:to-[#00B4D8] hover:border-transparent">
                <AppStoreIcon size={24} />
                <span className="text-white font-medium text-sm md:text-md">App Store</span>
            </button>
        </div>

      </div>

      {/* Imagen */}
      <div className="animate-subtitle max-w-2xl mx-auto mb-10 text-white/70 tracking-wider">
        <img
          src={mobile}
          srcSet={`
            /src/assets/mobile.webp 275w,
            /src/assets/mobile.webp 380w
          `}
          sizes="(max-width: 600px) 275px, 380px"
          alt="App móvil"
          className="w-[220px] md:w-[280px] drop-shadow-xl animate-fadeUp"
          loading="lazy"
          width="275"
          height="551"
        />
      </div>
    </div>
  );
}

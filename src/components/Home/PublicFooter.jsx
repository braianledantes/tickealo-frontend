import { FacebookIcon, InstagramIcon, TwitterIcon } from "./Icons";
import Logo from "../Logo";

export function PublicFooter() {
  return (
    <footer className="
      w-full text-white mt-auto
        bg-gradient-to-b
        from-[#0A0F2D]
        to-[#05081b]
        shadow-md
    ">
      <div className="flex flex-col items-center justify-center mx-auto space-y-4 py-6">
        <Logo />
        <div className="flex items-center gap-4"> 
          <a href="" className="text-white text-sm tracking-wider italic font-bold">HOME</a>
          <a href="https://tickealo-backend-nest-development.up.railway.app/" className="text-white text-sm tracking-wider italic font-bold">SOBRE NOSOTROS</a>
           <a href="https://www.figma.com/design/kUr5ukFXmlJNAJpi1bMSlv/TFTUDW?node-id=0-1&t=lesYZRF4CbTVIc6O-1" className="text-white text-sm tracking-wider italic font-bold">TÉRMINOS Y CONDICIONES</a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:opacity-80"
          >
            <FacebookIcon />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:opacity-80"
          >
            <TwitterIcon />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:opacity-80"
          >
            <InstagramIcon />
          </a>
        </div>
        <div className="text-sm tracking-wider text-white/70">
          Copyright ©{new Date().getFullYear()} Tickealo. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

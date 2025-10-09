import { FacebookIcon, InstagramIcon, TwitterIcon } from "./Icons";

export function PublicFooter() {
  return (
    <footer className="w-full text-white mt-auto bg-[#03045E]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            © {new Date().getFullYear()} Tickealo
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
        </div>
      </footer>
  );
}
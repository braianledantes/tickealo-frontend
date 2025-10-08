import { useNavigate } from "react-router-dom";
import logotipo from "../assets/logotipo.png";
import { useAuth } from "../hooks/useAuth";
import { PATHS } from "../routes/paths";
import Button from "../components/Button/Button";
import SecondaryButton from "../components/Button/SecondaryButton";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => navigate(PATHS.LOGIN);
  const handleRegister = () => navigate(PATHS.REGISTER);
  const handleDashboard = () => navigate(PATHS.DASHBOARD);
  const handleHome = () => navigate(PATHS.HOME);

  return (
    <div className="flex flex-col bg-[#05081b] overflow-y-auto h-screen scrollbar-none">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={logotipo}
            alt="Tickealo Logo"
            className="h-10 w-auto object-contain cursor-pointer"
            onClick={handleHome}
          />
        </div>

        <div className="flex gap-4">
          {!isAuthenticated ? (
            <>
              <Button text="Iniciar Sesión" onClick={handleLogin} />
              <SecondaryButton text="Registrarse" onClick={handleRegister} />
            </>
          ) : (
            <button
              onClick={handleDashboard}
              className="text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, #7226ff 0%, #160078 100%)",
              }}
            >
              Ir al Dashboard
            </button>
          )}
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-4 mb-23">
        <h2 className="text-2xl md:text-3xl font-semibold racking-wider text-white mb-2 text-center">
          CLIENTES
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-8 text-white/70">
          Descubrí eventos que se realizaron mediante nuestra <span className="font-bold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#03055F]  to-[#00B4D8]">TICKETERA QR</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-56">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://estadiosdeargentina.com.ar/wp-content/uploads/2014/02/estadio-ruca-che-neuquen2-1.jpg')",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6">
              <div className="flex items-center w-full gap-4">
                <div>
                  <div className="text-white font-semibold text-lg">
                    Ruca Che
                  </div>
                  <div className="text-sm text-white/80">
                    Sede de grandes eventos deportivos y musicales, albergando
                    desde partidos de alto nivel y competencias internacionales
                    hasta recitales de reconocidos artistas.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-56">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://imagenesyogonet.b-cdn.net/data/imagenes/2024/08/19/67020/1724070689-casino-magic-centenario-neuquen-02.jpg')",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6">
              <div className="flex items-center w-full gap-4">
                <div>
                  <div className="text-white font-semibold text-lg">
                    Casino Magic
                  </div>
                  <div className="text-sm text-white/80">
                    Presenta una agenda vibrante de espectáculos en vivo, que
                    combina conciertos de artistas nacionales e internacionales,
                    shows teatrales y propuestas culturales de primer nivel.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-56">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://neuquenalinstante-s2.cdn.net.ar/st2i1700/2023/04/neuquenalinstante2/images/44/76/447622_c487de37ff1e252356c571f1b25a0e8d3dbaafc7a1f013ddd7ffc65f15b4ca00/sm.jpg')",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6">
              <div className="flex items-center w-full gap-4">
                <div>
                  <div className="text-white font-semibold text-lg">
                    Antares
                  </div>
                  <div className="text-sm text-white/80">
                    Antares Neuquén alberga Musiquita Experience, un ciclo de
                    música electrónica con talentos emergentes y consagrados.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative rounded-xl overflow-hidden shadow-lg h-56">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://framerusercontent.com/images/KFsyMKPw72LxNCbjJ3SdH5aU.png')",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6">
              <div className="flex items-center w-full gap-4">
                <div>
                  <div className="text-white font-semibold text-lg">
                    SportTech
                  </div>
                  <div className="text-sm text-white/80">
                    SportTech y Tikzet transformaron la Copa del Mundo de
                    Taekwon-Do ITF “Mar del Plata 2024” con tecnología
                    innovadora.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className=" fixed bottom-0 w-full text-white mt-auto bg-[#03045E]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            © {new Date().getFullYear()} Tickealo
          </div>

          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.4 3.3-3.4.96 0 1.97.17 1.97.17v2.2h-1.12c-1.1 0-1.44.68-1.44 1.38v1.66h2.45l-.39 2.9h-2.06v7A10 10 0 0022 12z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.6 8.6 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.14 12.14 0 013 4.8a4.28 4.28 0 001.33 5.72 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98A8.59 8.59 0 012 19.54a12.13 12.13 0 006.57 1.92c7.88 0 12.2-6.53 12.2-12.19 0-.19 0-.39-.01-.58A8.7 8.7 0 0022.46 6z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className="text-white"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <path d="M17.5 6.5h.01"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

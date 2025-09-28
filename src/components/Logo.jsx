import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";

export default function HeaderLogo() {
  const navigate = useNavigate();

  return (
    <>
      {/* Gradiente */}
      <div className="gradient-triangle -top-40 w-full z-0 justify-center"></div>

      {/* Logo TICKEALO clickeable */}
      <div
        className="flex items-center gap-2 text-white font-bold text-2xl -z-20 p-4 justify-center cursor-pointer"
        onClick={() => navigate(PATHS.DASHBOARD)}
      >
        TICKEALO <img src="/tickealo.svg" alt="Logo Tickealo" className="w-7 h-7" />
      </div>
    </>
  );
}

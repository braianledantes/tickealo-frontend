import { useNavigate } from "react-router-dom";

export default function ButtonLink({ to, text, children }) {
  const navigate = useNavigate();
  
  return (
    <span
      className="underline cursor-pointer hover:text-white font-semibold transition-colors duration-200 text-blue-700"
      onClick={() => navigate(to)}
    >
      {children || text}
    </span>
  );
}
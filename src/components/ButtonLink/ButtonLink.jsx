import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonLink({to, text}) {
  const navigate = useNavigate();
  
  return (
    <span
      className="underline cursor-pointer hover:text-white font-semibold transition-colors duration-200 text-[#20347F]"
      onClick={() => navigate(to)}
    >
      {text}
    </span>
  );
}
import ButtonLink from '../components/Button/ButtonLink';
import Logo from "../components/Logo";
import { RegisterForm } from "../components/RegisterForm";
import { PATHS } from "../routes/paths";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#05081b] py-8">
      <div className=" top-10"><Logo /></div>

      <div className="justify-center items-center max-w-3xl">
        <h2 className="text-xl font-semibold text-center text-white my-6">Registrarse</h2>
        <RegisterForm />

        <p className="text-center mt-6 text-gray-200">
          ¿Ya tienes una cuenta? <ButtonLink to={PATHS.LOGIN} text="Inicia sesión aquí " />
        </p>
      </div>
    </div>
  );
}
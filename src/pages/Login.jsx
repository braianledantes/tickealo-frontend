import ButtonLink from '../components/Button/ButtonLink';
import { LoginForm } from '../components/LoginForm';
import Logo from '../components/Logo';
import { PATHS } from '../routes/paths';

export default function Login() {

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center bg-[#05081b]">

      <div className="absolute top-10"><Logo /></div>

      {/* Contenedor del formulario */}
      <div className="w-full max-w-md px-6">
        <h2 className="text-2xl font-regular-base text-center text-white/90 mb-4">Bienvenido!</h2>

        <LoginForm />

        <p className="text-center mt-6 text-gray-200">
          ¿No tienes una cuenta?{' '}
          <ButtonLink  to={PATHS.REGISTER} text="Regístrate aquí"/>
        </p>
      </div>
    </div>
  );
}

import { AtSign, KeyRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../Button/Button";
import Input from "../Input/Input";

export function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    setError('');

    const res = await login({ email, password });
    if (res.error) {
      setError('Credenciales inválidas, intenta nuevamente.');
    } else {
      setError('');
      // Redirigir o actualizar la UI según sea necesario
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input icon={<AtSign />} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input icon={<KeyRound />} placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit">
        {loading ? '...' : ''}
        Iniciar Sesión</Button>
      {error && <p className="text-red-400 text-center font-base-regular">{error}</p>}
    </form>
  )
}
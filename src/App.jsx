import { AuthProvider } from "./context/AuthContext.jsx";
import { CuentaBancariaProvider } from "./context/CuentaBancariaContext.jsx";
import { EquipoProvider } from "./context/EquipoContext.jsx";
import { EventoProvider } from "./context/EventoContext.jsx";
import Router from "./routes/Router.jsx";

function App() {
  return (
    <AuthProvider>
      <CuentaBancariaProvider>
        <EventoProvider>
          <EquipoProvider>
            <Router />
          </EquipoProvider>
        </EventoProvider>
      </CuentaBancariaProvider>
    </AuthProvider>
  );
}

export default App;

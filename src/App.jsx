import { AuthProvider } from "./context/AuthContext.jsx";
import { CuentaBancariaProvider } from "./context/CuentaBancariaContext.jsx";
import { EquipoProvider } from "./context/EquipoContext.jsx";
import { EventoProvider } from "./context/EventoContext.jsx";
import { ProductoraProvider } from "./context/ProductoraContext.jsx";
import Router from "./routes/Router.jsx";

function App() {
  return (
    <AuthProvider>
      <ProductoraProvider>
        <CuentaBancariaProvider>
          <EventoProvider>
            <EquipoProvider>
              <Router />
            </EquipoProvider>
          </EventoProvider>
        </CuentaBancariaProvider>
      </ProductoraProvider>
    </AuthProvider>
  );
}

export default App;

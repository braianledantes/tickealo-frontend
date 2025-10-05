import { AuthProvider } from "./context/AuthContext.jsx";
import { ComprasProvider } from "./context/ComprasContext.jsx";
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
              <ComprasProvider>
                <Router />
              </ComprasProvider>
            </EquipoProvider>
          </EventoProvider>
        </CuentaBancariaProvider>
      </ProductoraProvider>
    </AuthProvider>
  );
}

export default App;

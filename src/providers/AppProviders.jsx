import { PerfilProvider } from "../context/PerfilContext";
import { AuthProvider } from "../context/AuthContext";
import { CountryProvider } from "../context/CountryContext";
import { EventosProvider } from "../context/EventosContext";
import { CreditosProvider } from "../context/CreditosContext";
import { ComprasProvider } from "../context/ComprasContext";
import { ComentariosProvider } from "../context/ComentariosContext";
import { EquipoProvider } from "../context/EquipoContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <PerfilProvider>
        <CountryProvider>
          <EventosProvider>
            <CreditosProvider>
              <ComprasProvider>
                <ComentariosProvider>
                  <EquipoProvider>
                    {children}
                  </EquipoProvider>
                </ComentariosProvider>
              </ComprasProvider>
            </CreditosProvider>
          </EventosProvider>
        </CountryProvider>
      </PerfilProvider>
    </AuthProvider> 
  );
}

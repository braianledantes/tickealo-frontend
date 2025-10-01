import { AuthProvider } from "./context/AuthContext.jsx";
import { EventoProvider } from "./context/EventoContext.jsx";
import Router from "./routes/Router.jsx";

function App() {
  return (
    <AuthProvider>
      <EventoProvider>
        <Router />
      </EventoProvider>
    </AuthProvider>
  );
}

export default App;

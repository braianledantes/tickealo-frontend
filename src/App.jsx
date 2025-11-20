import { AppProviders } from "./providers/AppProviders.jsx";
import Router from "./routes/Router.jsx";
import TourProvider from "./components/Tour/TourProvider.jsx";

function App() {
  return (
    <TourProvider>
      <AppProviders>
        <Router />
      </AppProviders>
    </TourProvider>
  );
}

export default App;

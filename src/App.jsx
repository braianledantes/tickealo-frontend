import {AppProvider} from "./context/AppContext.jsx";
import Router from "./routes/Router.jsx";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

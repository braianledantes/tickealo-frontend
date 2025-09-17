import { AuthProvider } from "./context/AuthContext.jsx";
import Router from "./routes/Router.jsx";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;

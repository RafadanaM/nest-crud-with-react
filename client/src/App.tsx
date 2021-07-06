import "./App.css";
import Router from "./routes/Router";
import { AuthProvider } from "./auth/AuthContext";
import { ToastProvider } from "./components/Toast/ToastContext";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;

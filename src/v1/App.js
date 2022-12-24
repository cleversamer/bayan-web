import "v1/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "v1/context/AuthContext";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  );
}

export default App;

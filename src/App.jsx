
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoutes from "./Routes/AppRoutes";

function App() {

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  return (
    <>
    <GoogleOAuthProvider clientId={clientId}>
      <AppRoutes/>
    </GoogleOAuthProvider>
    </>
  );
}

export default App;

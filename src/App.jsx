
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoutes from "./Routes/AppRoutes";
import google from "../GoogleSecret";

function App() {

  const clientId = google.GOOGLE_CLIENT_ID

  return (
    <>
    <GoogleOAuthProvider clientId={clientId}>
      <AppRoutes/>
    </GoogleOAuthProvider>
    </>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n"; // Import i18n configuration
import ConsumerContext from "./Context/ConsumerContext.jsx";
import ProducerContext from "./Context/ProducerContext.jsx";
import UpcyclingIContext from "./Context/UpcyclingIContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NgoContext from "./Context/NgoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <NgoContext>
          <UpcyclingIContext>
            <ProducerContext>
              <ConsumerContext>
                <App />
              </ConsumerContext>
            </ProducerContext>
          </UpcyclingIContext>
      </NgoContext>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);

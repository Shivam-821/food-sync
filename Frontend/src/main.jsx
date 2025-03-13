import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n"; // Import i18n configuration
import ConsumerContext from "./Context/ConsumerContext.jsx";
import ProducerContext from "./Context/ProducerContext.jsx";
import UpcyclingIContext from "./Context/UpcyclingIContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UpcyclingIContext>
    <ProducerContext>
      <ConsumerContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConsumerContext>
    </ProducerContext>
    </UpcyclingIContext>
  </StrictMode>
);

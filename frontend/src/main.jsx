import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-mgdoyd0t520ksmxi.us.auth0.com"
      clientId="OyUd9zO0R9LJ5yud1yEpcHOjlpYgRBDV"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </Provider>
);

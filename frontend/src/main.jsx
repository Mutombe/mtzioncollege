import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-mgdoyd0t520ksmxi.us.auth0.com"
    clientId="OyUd9zO0R9LJ5yud1yEpcHOjlpYgRBDV"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);

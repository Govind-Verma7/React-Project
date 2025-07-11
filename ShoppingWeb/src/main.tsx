import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Auth0Provider } from '@auth0/auth0-react';


createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-vwjm1kglom7xs748.us.auth0.com"
    clientId="6NwwpcIgDzuAgiUxvuJHVmzx03DmdC2n"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  </Provider>
  </Auth0Provider>
);

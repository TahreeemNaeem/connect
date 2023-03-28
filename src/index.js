import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createClient, configureChains, goerli } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
//import reportWebVitals from './reportWebVitals';
import { WagmiConfig } from 'wagmi'

const { provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()],
)
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
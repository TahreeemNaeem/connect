import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Profile from './App';
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
function App() {
 return (
 <WagmiConfig client={client}>
 <Profile />
 </WagmiConfig>
 )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
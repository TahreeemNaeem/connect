import './App.css';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Mint from './components/mint';
import Connect from './components/connect';


function App() {

  const { isConnected } = useAccount()

  return (
      <>
      {
        isConnected?<Mint/>:<Connect/>
      }
      </>
    );
      
    }
export default App;
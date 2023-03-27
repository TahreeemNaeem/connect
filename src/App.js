import './App.css';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Mint from './components/Mint';
import Connect from './components/Connect';


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
import './App.css';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Mint from './components/mint';
import ContractInteraction from './components/contractInteraction';


function App() {

  const { isConnected } = useAccount()
  return (
      <>
      {
        <ContractInteraction/>
      }
      </>
    );
      
    }
export default App;
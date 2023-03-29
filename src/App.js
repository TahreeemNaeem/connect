import './App.css';
import React, { useEffect, useState ,useContext} from 'react';
import ContractInteraction from './components/contractInteraction';
import Connect from './components/connect';
import { ethers } from 'ethers';
export const MyContext = React.createContext({
  myBooleanVariable: true,
  setMyBooleanVariable: () => {}
});

function App() {
  const [ myBooleanVariable,setMyBooleanVariable ] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const checkConnection = async () => {
      const signer = await provider.getSigner();
      if (await signer.getAddress() !== null) {
        setMyBooleanVariable(true);
      } else {
        setMyBooleanVariable(false);
      }
    };
    checkConnection();
  }, []);

  return (
    <MyContext.Provider value={{ myBooleanVariable,setMyBooleanVariable }} >
      {myBooleanVariable ? <ContractInteraction /> : <Connect />}
    </MyContext.Provider>
  );
}

export default App;
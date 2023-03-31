import './App.css';
import React, { useEffect, useState} from 'react';
import ContractInteraction from './components/contractInteraction';
import Connect from './components/connect';
import Changechainid from './components/changechain';
import { ethers } from 'ethers';
import { MyContext } from './components/MyContext';

function App() {

  const [Display, setDisplay] = useState(true);
  const [ myBooleanVariable,setMyBooleanVariable ] = useState(false);

  window.ethereum.on('disconnect', (error) => {
    setMyBooleanVariable(false);
 });

  window.ethereum.on('chainChanged', async (chainId) => {
      console.log(chainId)
      if(chainId==='0x5'){
        setDisplay(true)
      }
      else 
        setDisplay(false)
  });

  useEffect(() => {
    
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.getNetwork().then((network) => {
        if(network.chainId===5)
        setDisplay(true);
        else
        setDisplay(false);
      });

      const checkConnection = async () => {
      const signer = await provider.getSigner();
      if (await signer.getAddress() !== null) {
        setMyBooleanVariable(true);
      } else {
        setMyBooleanVariable(false);
      }
      };
      checkConnection();
    }

    return () => {
      window.ethereum.on('disconnect', (error) => {
        console.log('diconnect',error)
     });
    }
  },);

  return (
    <MyContext.Provider value={{ myBooleanVariable,setMyBooleanVariable,Display }} >
      {myBooleanVariable ? Display ? <ContractInteraction /> : <Changechainid/> : <Connect />}
    </MyContext.Provider>
  );
}

export default App;
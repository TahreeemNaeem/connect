import './App.css';
import React, { useState, useEffect } from 'react';
import ContractInteraction from './components/contractInteraction';
import Connect  from './components/connect';
import { ethers } from 'ethers'

function App() {
  const [isConnected, setIsConnected] = useState(false);
  
  const provider= (new ethers.providers.Web3Provider(window.ethereum));

  useEffect(() => {
      const  checkConnection = async () => {
        const signer = await provider.getSigner();
        if (await signer.getAddress()!==null) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      };
    checkConnection();
    }
        
, []);
  return (
      <div>
      {
        isConnected?<ContractInteraction/>:<Connect/> 
      }
      </div>
    );
      
    }
export default App;
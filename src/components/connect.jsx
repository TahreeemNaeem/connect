import React, { useContext } from 'react';
import { MyContext } from '../App';

export default function Connect() {
  const { myBooleanVariable,setMyBooleanVariable } = useContext(MyContext);

  const connectWallet = async () => {
    if (window.ethereum !== 'undefined') {
      const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' }).catch((error) => {
        if (error.code === 4001) {
          console.log('Please connect to MetaMask.');
        }
      });
      setMyBooleanVariable(true);
      console.log(myBooleanVariable);
    } else {
      console.log('Please Install Metamask!!!');
    }
  };

  return <button onClick={() => connectWallet()}>Connect Wallet</button>;
}






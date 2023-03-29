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
      if(addresses.length!=0){
      setMyBooleanVariable(true);
      console.log(myBooleanVariable);
      }
    } else {
      console.log('Please Install Metamask!!!');
    }
  };

  return <div style={{
    display: 'flow',
    textAlign: 'center', 
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    marginTop:'30vh'
  }}>
    <h3>Connect Your Metamask Wallet</h3>  
  <button style={{
           height: '4vh',
           width:'15vh',
           borderLeft:'12vh',
           border:'1vh'
    }} onClick={() => connectWallet()}>Connect Wallet</button>
  </div> 
}






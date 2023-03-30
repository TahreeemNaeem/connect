import React, { useContext, useState } from 'react';
import { MyContext } from './MyContext';

export default function Connect() {
  const { myBooleanVariable,setMyBooleanVariable } = useContext(MyContext);
  const [connectioninfo,setconnectioninfo] = useState('')
  const connectWallet = async () => {
    if (window.ethereum) {
      const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' }).catch((error) => {
        if (error.code === 4001) {
          setconnectioninfo('Please connect to MetaMask. User rejected Connection');
        }
        else{
          setconnectioninfo(`Error: ${error.message}`);
        }
      });
      if(addresses.length!==0){
      setMyBooleanVariable(true);
      }
    } else {
      setconnectioninfo('Please Install Metamask!!!');
    }
  };

  return <div  style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '50vh',
    width: '80vh',
    border: '4px solid #ccc',
    borderRadius: '10px',
    marginLeft:'60vh',
    marginTop:'20vh',
    }}>
    <h3 style={{ 
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '3vh',
    }}>Connect Your Metamask Wallet to mint</h3>  
  <button style={{
     fontSize: '18px',
           height: '6vh',
           width:'30vh',
           borderLeft:'12vh',
           border:'1vh'
    }} onClick={() => connectWallet()}>Connect Wallet</button>
     <div style={{ 
            fontSize: '16px',
            color: 'red',
        }}> {connectioninfo}</div>
  </div> 
}






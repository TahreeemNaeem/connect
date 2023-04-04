import { ethers } from 'ethers';
import React, { useContext, useState } from 'react';
import { MyContext } from './MyContext';


export default function Connect() {
  const {setMyBooleanVariable } = useContext(MyContext);
  const [connectioninfo,setconnectioninfo] = useState('')
  const [connect,setconnect] = useState('Connect Wallet')

  const connectWallet = async () => {
    const provider= (new ethers.providers.Web3Provider(window.ethereum));
    if (window.ethereum) {
      setconnect('Connecting')
      const network = await provider.getNetwork()
      try {
      if (network.chainId !== 11155111) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }], 
          });
      }
      const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if(addresses.length!==0){
        setMyBooleanVariable(true);
        }
    }
    catch(error)  {
      if (error.code === 4001) {
        setconnectioninfo('Please connect to MetaMask. User rejected Connection');
        setconnect('Connect Wallet')
      }
      else{
        setconnectioninfo(`Error: ${error.message}`);
        setconnect('Connect Wallet')
      }
     }
    }
    else {
      setconnectioninfo('Please Install Metamask!!!');
      setconnect('Connect Wallet')
    }
  };

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '4px solid #ccc',
    borderRadius: '10px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    width: 'auto',
    height: 'auto',
    padding: '2rem',
    backgroundColor: '#F5F5F5',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
  }}>
    <h2 style={{
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '3vh',
      textAlign: 'center'
    }}>Mint NFT</h2>
    <h3 style={{ 
        fontSize: '18px',
        fontWeight: 'normal',
        marginBottom: '3vh',
        textAlign: 'center'
    }}>Connect your Metamask wallet to mint</h3>  
  <button style={{
      height: '40px',
      width: '150px',
      backgroundColor: '#4A4A4A',
      color: 'white',
      fontSize: '20px',
      border: 'none',
      cursor: 'pointer',
      display: 'block',
      margin: '0 auto',
      borderRadius: '10px',
    }} onClick={() => connectWallet()}>{connect}</button>
     <div style={{ 
            fontSize: '16px',
            color: 'red',
            textAlign: 'center',
            marginTop: '1rem'
        }}> {connectioninfo}</div>
  </div>
}






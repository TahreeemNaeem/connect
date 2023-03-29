import React from 'react';

export default function Connect() {

  const connectWallet = async() => {
    if ( window.ethereum !== 'undefined') {
       let addresses = await window.ethereum.request({ method: 'eth_requestAccounts' }).then()
       .catch((error) => {
         if (error.code === 4001) {
           console.log('Please connect to MetaMask.');
         }
        })
        if(addresses.length!=0)
         window.location.reload()
      }
       else {
        console.log("Please Install Metamask!!!");
    }
  }
  return (
    <button onClick={() => connectWallet()}>Connect Wallet</button>
  )
}
import React, { useState, useEffect,useContext } from 'react';
import { MyContext } from './MyContext';

export default function Changechainid() {
    const {setMyBooleanVariable } = useContext(MyContext);
    const [connectioninfo,setconnectioninfo] = useState('')

    const  changechainid = (async ()=>{
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }], // Goerli chain ID
        }).catch(async (error) => {
        if (error.code === 4001) {
          setconnectioninfo('User rejected the request');
        }
        else{
          setconnectioninfo(`Error: ${error.message}`);
        }
      });
    });

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    function  handleAccountsChanged(accounts) {
      if(accounts.length===0)
        setMyBooleanVariable(false)
      }

    return(
        <div style={{
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
             <h2 style={{ 
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '3vh',
    }}>  MINT NFT </h2>
     <button style={{
            height: '40px',
            width: '250px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }} onClick={() => changechainid()}> Change Network </button>
        <div style={{ 
            fontSize: '16px',
            color: 'red',
        }}>{connectioninfo}</div>
        </div>
    );
    }

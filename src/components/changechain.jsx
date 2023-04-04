import React, { useState, useEffect,useContext } from 'react';
import { MyContext } from './MyContext';

export default function Changechainid() {
    const {setMyBooleanVariable } = useContext(MyContext);
    const [connectioninfo,setconnectioninfo] = useState('')
  
    const  changechainid = (async ()=>{
      try{
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], 
        })
      }
        catch(error){
        if (error.code === 4001) {
          setconnectioninfo('User rejected the request');
        }
        else{
          setconnectioninfo(`Error: ${error.message}`);
        }
        }
    });

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    function  handleAccountsChanged(accounts) {
      if(accounts.length===0)
        setMyBooleanVariable(false)
      }

    return(
        <div  style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '2px solid #1F2937',
      borderRadius: '10px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: 'auto',
      height: 'auto',
      padding: '2rem',
      backgroundColor: '#F9FAFB',
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
          }}> 
             <h2 style={{ 
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '2vh',
        color: '#1F2937',
    }}>  MINT NFT </h2>
     <button style={{
            height: '40px',
            width: '250px',
            backgroundColor: '#4A4A4A',
            color: 'white',
            fontSize: '20px',
            border: 'none',
            cursor: 'pointer',
            display: 'block',
            margin: '0 auto',
            borderRadius: '10px',
        }} onClick={() => changechainid()}> Change Network </button>
        <div style={{ 
            fontSize: '16px',
            color: 'red',
        }}>{connectioninfo}</div>
        </div>
    );
    }

import { ethers } from 'ethers'
import ABI from '../Assets/abi.json'
import { MyContext } from './MyContext';
import React, { useState, useEffect,useContext } from 'react';



export default  function ContractInteraction() {

    const [transactioninfo, settransactioninfo] = useState('');
    const {setMyBooleanVariable } = useContext(MyContext);
    const [address, setAddress] = useState(null);
    const [balance, setBlance] = useState('');
    const [mintingfee, setMintingfee] = useState('');
    const [totalsupply, settotalsupply] = useState('');
    const [nftsminted, setnftsminted] = useState('');
    const [canmintnft,setCanMint] = useState(true)
    const [mintnft,setmintnft] = useState('Mint NFT')

    const provider= (new ethers.providers.Web3Provider(window.ethereum));
    const signer = provider.getSigner()

    const NFT =  new ethers.Contract('0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e', ABI, (provider.getSigner()));
    
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    function  handleAccountsChanged(accounts) {
      if(accounts.length===0)
        setMyBooleanVariable(false)
      else{
        signer.getAddress().then((resolvedAddress) => {
          setAddress(resolvedAddress.toString());
        });
      }
    }
    
    useEffect(() => {
        const addressPromise = signer.getAddress(); // returns a Promise
        const balancepromise =  signer.getBalance();
        const mintingfeepromise =  NFT.getMintingFee();
        const nftsmintedpromise =  NFT.totalNFTsMinted();
        const totalsupplypromise = NFT.totalSupply();

        addressPromise.then((resolvedAddress) => {
            setAddress(resolvedAddress.toString());
        });
        balancepromise.then((resolvedbalance) => {
            setBlance(ethers.utils.formatEther(resolvedbalance));
        });
        mintingfeepromise.then((resolvedmintfee) => {
            setMintingfee(ethers.utils.formatEther(resolvedmintfee));
        });
        nftsmintedpromise.then((resolvednftsminted) => {
            setnftsminted(resolvednftsminted.toNumber());
        });
        totalsupplypromise.then((resolvedtotalsupply) => {
            settotalsupply(resolvedtotalsupply.toNumber());
        }); 

  },);
    
    const overrides = {value: ethers.utils.parseEther('0.000000000000000001')}
    const mint = async () => {
      setCanMint(false)
      setmintnft('Minting')
      try {
        
        const transaction = await NFT.mint( signer.getAddress(), overrides);
        await transaction.wait();
        setnftsminted((await NFT.totalNFTsMinted()).toNumber());
        settransactioninfo('Successfully Minted');
        setmintnft('Mint NFT')
        setCanMint(true)
      } catch (error) {
        console.error(error);
        if (error.code === 'ACTION_REJECTED') {
          settransactioninfo('User Denied Transaction');
          setmintnft('Mint NFT');
          setCanMint(true)
        }
        else {
          settransactioninfo(`Error: ${error.message}`);
          setmintnft('Mint NFT')
          setCanMint(true)
        }
      }
    };
  
    return( 
      <div style={{
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
      }}>
        <h2 style={{ 
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '3vh',
        }}>MINT NFT</h2>
        <div style={{ 
          fontSize: '16px',
          marginBottom: '2vh',
          color: 'initial',
        }}>Connected to {address}</div>
        <div style={{ 
          fontSize: '24px',
          marginBottom: '2vh',
        }}>Total NFTs minted: {nftsminted} / {totalsupply}</div>
        <div style={{ 
          fontSize: '18px',
        }}>Minting fee: {mintingfee} ether</div>
        {(balance > mintingfee) ?
          <div>
            <p style={{ 
              fontSize: '20px',
              marginBottom: '2vh',
              color: 'Highlight',
            }}>To mint an NFT, click the button below.</p>
            <button style={{
              height: '40px',
              width: '150px',
              backgroundColor: 'black',
              color: 'white',
              fontSize: '20px',
              border: 'none',
              cursor: 'pointer',
              display: 'block',
              margin: '0 auto'
            }} onClick={() => mint()} disabled={!canmintnft}>{mintnft}</button>
          </div> :
          <h3 style={{ 
            fontSize: '24px',
            color: 'red',
            marginTop: '3vh',
          }}>Insufficient Balance</h3>}
        <div style={{ 
          fontSize: '16px',
          color: 'red',
        }}>{transactioninfo}</div>
      </div>
    
    );

}

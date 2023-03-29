import { ethers } from 'ethers'
import ABI from '../Assets/abi.json'
import { MyContext } from '../App';
import React, { useState, useEffect,useContext } from 'react';



export default  function ContractInteraction() {
  
    const {setMyBooleanVariable } = useContext(MyContext);
    const [address, setAddress] = useState(null);
    const [balance, setBlance] = useState('');
    const [mintingfee, setMintingfee] = useState('');
    const [totalsupply, settotalsupply] = useState('');
    const [nftsminted, setnftsminted] = useState('');
    const [canMint,setCanMint] = useState(false)
    const provider= (new ethers.providers.Web3Provider(window.ethereum));
    const signer = provider.getSigner()

    const NFT =  new ethers.Contract('0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e', ABI, (provider.getSigner()));

    const addressPromise = signer.getAddress(); // returns a Promise
    const balancepromise =  signer.getBalance()
    const mintingfeepromise =  (NFT.getMintingFee());
    const nftsmintedpromise =  NFT.totalNFTsMinted();
    const totalsupplypromise =  NFT.totalSupply();
    

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    function handleAccountsChanged(accounts) {
      if(accounts.length===0)
      setMyBooleanVariable(false)
    }


    useEffect(() => {

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
        }
  ,);
    
    const overrides = {value: ethers.utils.parseEther('0.000000000000000001')}
    const mint = async () => {
      const transaction = await NFT.mint(addressPromise, overrides);
      await transaction.wait();
      setnftsminted((await NFT.totalNFTsMinted()).toNumber())
    };
  
    return( 
       <div style={{
        display: 'flow',
        textAlign: 'center', 
        fontWeight: 'italic',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        marginTop:'30vh'
      }}>
        <h3> Connected to</h3>
        <div>{address}</div>
        <div>NFT minting fee : {mintingfee} ether</div>
        <div>Total nfts minted : {nftsminted} /{totalsupply}</div>
        {(balance>mintingfee)?
        <button style={{
           height: '4vh',
           width:'15vh',
           borderLeft:'12vh',
           border:'1vh'
    }} onClick={() => mint()}> mint</button>:<h1>Balance Low</h1>}
        </div>
    );

}

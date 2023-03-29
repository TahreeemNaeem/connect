import { ethers } from 'ethers'
import ABI from '../Assets/abi.json'
import React, { useState, useEffect } from 'react';



export default  function ContractInteraction() {
    const [address, setAddress] = useState(null);
    const [balance, setBlance] = useState('');
    const [mintingfee, setMintingfee] = useState('');
    const [totalsupply, settotalsupply] = useState('');
    const [nftsminted, setnftsminted] = useState('');
    
const provider= (new ethers.providers.Web3Provider(window.ethereum));


    const NFT =  new ethers.Contract('0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e', ABI, (provider.getSigner()));
    const signer =  provider.getSigner()
    const addressPromise = signer.getAddress(); // returns a Promise
    const balancepromise =  signer.getBalance()
    const mintingfeepromise =  (NFT.getMintingFee());
    const nftsmintedpromise =  NFT.totalNFTsMinted();
    const totalsupplypromise =  NFT.totalSupply();
    if(signer.getAddress==null)
         window.location.reload()
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
    const mint = async()=> {await NFT.mint(addressPromise,overrides)
      window.location.reload()}

    return( 
       <div>
        Connected to
        <div>{address}</div>
        <div>NFT minting fee {mintingfee} ether</div>
        <div>Total nfts minted {nftsminted} /{totalsupply}</div>
        <button onClick={() => mint()}> mint</button></div>
    );

}

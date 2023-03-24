import './App.css';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useContractReads } from 'wagmi'
import { useBalance, useContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import React, { useState } from 'react';

function cheackbalance(balance,data){
  if(balance<=data){
   return "low balance"
  }
}

    function Profile() {
      const { address, isConnected } = useAccount()
      const { connect } = useConnect({
      connector: new InjectedConnector(),
      })
      const data2 = useBalance({
        address,
        formatUnits: 'gwei',
        chainid:5,
      })
      const balance= data2?.data.value;

     //console.log(balance)
     
      const { data, } = useContractReads({
        contracts:[{
          address: '0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e',
          abi: '[{"inputs":[],"name":"getMintingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]',
          chainid:5,
          functionName: 'getMintingFee',
        },
        {
          address: '0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e',
          abi: '[{"inputs":[],"name":"totalNFTsMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]',
          chainid:5,
          functionName: 'totalNFTsMinted',
        },
        {
          address: '0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e',
          abi: '[{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]',
          chainid:5,
          functionName: 'totalSupply',
        },
        ]
      })
      
      const mintingfee =ethers.utils.formatEther(data[0]);
      const nftsminted =data[1].toNumber();
      const totalsupply =data[2].toNumber();
      //console.log(mintingfee+nftsminted+totalsupply)
      const [state, setstate] = useState('');
    
       const {data1, isLoading, isSuccess, write} = useContractWrite({
        address: '0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e',
        abi:'[{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"}]',
        chainid:5,
        functionName: 'mint',
       args: [address],
       overrides: {
        from: address,
        value: data[0],}
      })
      if (isConnected)
      return (
      <div>
      Connected to
       <div>{address}</div>
        <div>NFT minting fee {mintingfee} ether</div>
       <div>Total nfts minted {nftsminted} /{totalsupply}</div>
       <button onClick={() => write()}> mint</button>
       <div>{cheackbalance(balance,data[0])}</div>
      </div>
      )
      return <button onClick={() => connect()}>Connect Wallet</button>
     }

export default Profile;
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import ABI from '../Assets/abi.json'
import { useAccount, useBalance, useContractReads, useContractWrite, useDisconnect } from 'wagmi'



export default function Mint() {

    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const [canMint,setCanMint] = useState(false)


    var balance1 = useBalance({
        address,
        formatUnits: 'wei',
        chainid: 5,
    })


    const { data, } = useContractReads({
        contracts: [{
            address: '0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e',
            abi: ABI,
            chainid: 5,
            functionName: 'getMintingFee',
        },
        {
            address: '0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e',
            abi: ABI, chainid: 5,
            functionName: 'totalNFTsMinted',
        },
        {
            address: '0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e',
            abi: ABI, chainid: 5,
            functionName: 'totalSupply',
        },
        ]
    })
    var mintingfee = ethers.utils.formatEther(data[0]);
    var nftsminted = data[1].toNumber();
    var totalsupply = data[2].toNumber();
    
    useEffect(()=>{
       var balance = balance1.data?.value
        setCanMint(balance>data[0])
    },[data])
    
     const {write} = useContractWrite({
      address: '0x2fd1E0aBBb24d81d7E042EEAFd696f42a313A19e',
      abi:ABI,
      chainid:5,
      functionName: 'mint',
     args: [address],
     overrides: {
      from: address,
      value: data[0],}
    })
    return (
        <div>
            Connected to
            <div>{address}</div>
            <div>NFT minting fee {mintingfee} ether</div>
            <div>Total nfts minted {nftsminted} /{totalsupply}</div>
            {canMint?
            <button onClick={() => write()}> mint</button>:
            <h1>low balance</h1>
            }
            <div><button onClick={() => disconnect()}>Disconnect</button></div>

        </div>
    )
}

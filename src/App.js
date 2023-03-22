import './App.css';
import { connect } from '@wagmi/core'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { getAccount } from '@wagmi/core'
import { fetchBalance } from '@wagmi/core'
import { fetchEnsName } from '@wagmi/core'
import { readContract } from '@wagmi/core'
import { useState } from "react";
import { prepareWriteContract, writeContract } from '@wagmi/core'


function refreshPage() {
  window.location.reload(false);
}
const abi ='[{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"string","name":"_tokenuri","type":"string"},{"indexed":false,"internalType":"uint256","name":"_price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_rent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_expiretime","type":"uint256"},{"indexed":false,"internalType":"bool","name":"_rentable","type":"bool"},{"indexed":false,"internalType":"bool","name":"_sold","type":"bool"}],"name":"NFTListed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_expiretime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_rent","type":"uint256"}],"name":"NFTRented","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"NFTUnlisted","type":"event"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"NFTDetail","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"rent","type":"uint256"},{"internalType":"uint256","name":"expiretime","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"bool","name":"rentable","type":"bool"},{"internalType":"bool","name":"sold","type":"bool"}],"internalType":"struct NFTMarketPlace.NFT","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"buyNFT","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getListingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"string","name":"_tokenuri","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_rent","type":"uint256"},{"internalType":"uint256","name":"_expiretime","type":"uint256"},{"internalType":"bool","name":"_rentable","type":"bool"},{"internalType":"bool","name":"_sold","type":"bool"}],"name":"listNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"rentNFT","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"unlistNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newlistingfee","type":"uint256"}],"name":"updateListingFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"updateNFTUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"updatePriceOfNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_rent","type":"uint256"}],"name":"updateRentOfNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_rentable","type":"bool"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"updateStatusOfNFTRentable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_sold","type":"bool"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"updateStatusOfNFTSold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawEth","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
 function App() {
  const account = getAccount()
  const address =account.address;
const balance =  fetchBalance({
  address,
  chainId: 5,
})
  // console.log(balance);
  // const ensName = fetchEnsName({
  //   address,
  // })
  // console.log(ensName);
 //read contract and return value in hex
//  const data =  readContract({
//   address: '0x857A2BDC5226B6e75E3F929099f0e42C0f787219',
//   abi,
//   functionName: 'getListingFee',
//   chainId: 5,
// })

 
// const config =  prepareWriteContract({
//   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
//   abi:'',
//   functionName: 'updateListingFee',
//   chainis: 5,
//   args:[1],
// })
// const data1 =  writeContract(config)
//console.log(data1);


  const [Address, setAddress] = useState("Connect Wallet");
  // if(account.isConnected){
  //   return (
  //     <div>
  //       <h1>Wallet Connect</h1> <div>connected to </div>
  //       {address}
  //     </div>
  //   );
  // }
   return (
    <div>
      <h1>Wallet Connect</h1>
      <button onClick={() =>{connect({ connector: new InjectedConnector(),});
      setAddress(address)}}
     >{Address}</button>
    </div>
  );
  
}

export default App;

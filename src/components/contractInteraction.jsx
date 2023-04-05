import { ethers } from 'ethers'
import ABI from '../Assets/abi.json'
import { MyContext } from './MyContext';
import React, { useState, useEffect,useContext } from 'react';



export default  function ContractInteraction() {

    const [transactioninfo, settransactioninfo] = useState('');
    const {setMyBooleanVariable} = useContext(MyContext);
    const [address, setAddress] = useState(null);
    const [balance, setBlance] = useState('');
    const [mintingfee, setMintingfee] = useState('');
    const [totalsupply, settotalsupply] = useState('');
    const [nftsminted, setnftsminted] = useState('');
    const [canmintnft,setCanMint] = useState(true)
    const [mintnft,setmintnft] = useState('Mint NFT')
    const [tokenids,setTokenIds]= useState([])
    const [images,setImages]= useState([])
    const [text,setText]= useState('')
    const [inputValue, setInputValue] = useState(1);

    const provider= (new ethers.providers.Web3Provider(window.ethereum));
    const signer = provider.getSigner()

    const NFT =  new ethers.Contract('0x7465278896C47292301045d6bE4298794204594C', ABI, (provider.getSigner()));
    
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


    async function  getImage(id) {
      for(let i=0;i<id.length;i++){
      const URL =  await NFT.tokenURI(id[i]);
      fetch(URL)
      .then(res => res.json())
         .then(async metadata =>{
          const img =metadata.image
              setImages(arr => [...arr, img]);
              console.log(img)
            })
           .catch(err => { throw err });
          }
      }
    const handleChange = (event) => {
      setInputValue(event.target.value);
     };

    const mint = async () => {
      const amount = 0.000000000000000001;
      const net = (amount*inputValue).toFixed(18);
      console.log(net)
      const overrides = {value: ethers.utils.parseEther(net.toString())}
      setCanMint(false)
      setmintnft('Minting')
      setText("loading new NFT")
      try {
        
        const transaction = await NFT.mintBatch( signer.getAddress(),inputValue, overrides)
        const receipt = await transaction.wait();

        const event = receipt.events;
        const ids = ((event[0].args.ids));
        console.log(ids)
        let tokenids=[];
        for (let i = 0; i < ids.length; i++) {
          tokenids[i]=ids[i].toNumber()
        }
        console.log(tokenids)
        await getImage(tokenids)
        setnftsminted((await NFT.totalNFTsMinted()).toNumber());
        settransactioninfo('Successfully Minted');
        setmintnft('Mint NFT')
        setCanMint(true)
        setText("New Minted NFt")

      } catch (error) {
        console.error(error);
        if (error.code === 'ACTION_REJECTED') {
          settransactioninfo('User Denied Transaction');
          setmintnft('Mint NFT');
          setCanMint(true)
          setText("")
        }
        else {
          settransactioninfo(`Error: ${error.message}`);
          setmintnft('Mint NFT')
          setCanMint(true)
          setText("")
        }
      }
    };
    return (
      <div
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #1F2937",
    borderRadius: "10px",
    maxWidth: "90vw",
    maxHeight: "90vh",
    width: "auto",
    height: "auto",
    padding: "2rem",
    backgroundColor: "#F9FAFB",
  }}
>
<div style={{ 
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   textAlign: "center", }}>
  <div>
  <h2
    style={{
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "2vh",
      color: "#1F2937",
    }}
  >
    MINT NFT
  </h2>
  <div
    style={{
      fontSize: "16px",
      marginBottom: "1vh",
      color: "#4B5563",
    }}
  >
    Connected to {address}
  </div>
  <div
    style={{
      fontSize: "20px",
      marginBottom: "2vh",
      color: "#1F2937",
    }}
  >
    Total NFTs minted: {nftsminted} / {totalsupply}
  </div>
  <div
    style={{
      fontSize: "18px",
      marginBottom: "2vh",
      color: "#4B5563",
    }}
  >
    Minting fee: {mintingfee} ether
  </div>

    {(balance > mintingfee) ? (
      <div>
        <p
          style={{
            fontSize: "20px",
            marginBottom: "1vh",
            color: "#1F2937",
          }}
        >
          To mint NFTs, click the button below.
        </p>
  
        <div style={{
            display: "flex",
            margin: "0 auto",
            border: "2px solid gray",
            borderRadius: "5px",
            backgroundColor: "#fff",
            width: "fit-content",
            height: "2.5rem",
        }}>
              <button
                style={styles.arrowBtn}
                disabled={!canmintnft}
                onClick={() => setInputValue((prev) => prev + 1)}
              >
                &#x25B2;
              </button>
              <input
                type="number"
                value={inputValue}
                onChange={handleChange}
                disabled={!canmintnft}
                style={{
                  fontSize: "1.2rem",
                  padding: "0.5rem",
                  textAlign: "center",
                  width: "3rem",
                }}
              />
              <button
                style={styles.arrowBtn}
                disabled={!canmintnft}
                onClick={() =>
                  setInputValue((prev) => (prev > 1 ? prev - 1 : 1))
                }
              >
               &#x25BC;
              </button>
            </div>
 

        <button
          style={{
            height: "40px",
            width: "150px",
            backgroundColor: "#4A4A4A",
            color: "white",
            fontSize: "20px",
            border: "none",
            cursor: "pointer",
            display: "block",
            margin: "0 auto",
            borderRadius: "10px",
          }}
          onClick={() => mint()}
          disabled={!canmintnft}
        >
          {mintnft}
        </button>
      </div>
    ) : (
      <h3
        style={{
          fontSize: "24px",
          color: "#EF4444",
          marginTop: "2vh",
        }}
      >
        Insufficient Balance
      </h3>
    )}
     <div
      style={{
        fontSize: "16px",
        color: "#EF4444",
      }}>
      {transactioninfo}
    </div>
  
  
  </div>
  <div
      style={{
        display: "flex",
        overflowX: "auto",
        maxWidth: "100%",
        marginTop: "20px",
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`image ${index + 1}`}
          style={{
            maxWidth: "50%",
            height: "auto",
            width : "auto",
            borderRadius: "10px", }}
        />
      ))}
    </div>
    <div>{text}</div>
  </div>
 
</div>
    );

}
const styles = {
  arrowBtn: {
    color: "gray",
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "0 0.5rem",
    outline: "none",
  },
 
};

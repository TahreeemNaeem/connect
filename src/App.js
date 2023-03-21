import './App.css';
import { connect } from '@wagmi/core'
import { InjectedConnector } from '@wagmi/core/connectors/injected'
import { getAccount } from '@wagmi/core'


 function App() {
  const account = getAccount()
  const address =account.address

  if(account.isConnected){
    return (
      <div>
        <h1>Wallet Connect</h1> <div>connected to </div>
        {address}
      </div>
    );
  }
   return (
    <div>
      <h1>Wallet Connect</h1>
      <button onClick={() => {connect({ connector: new InjectedConnector(), }) }}
     >Connect Wallet</button>
    </div>
  );
  
}

export default App;

import './App.css';
import { useAccount,} from 'wagmi';
import Mint from './components/mint';
import Connect from './components/connect';


function App() {

  const { isConnected } = useAccount()
  
  return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
      {
        isConnected?<Mint/>:<Connect/>
      }
      </div>
    );
}
export default App;
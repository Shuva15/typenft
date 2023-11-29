import './App.css';
import MintNft from './components/MintNft'
import { authenticate, unauthenticate } from '@onflow/fcl'
import useCurrentUser from './lib/utils';

function App() {
  const { addr, loggedIn } = useCurrentUser();
  return (
    <div className="App">
      {loggedIn ? <button onClick={unauthenticate}>log out</button> : <button onClick={authenticate}>connect</button>}
      {loggedIn && <MintNft />}
    </div>
  );
}

export default App;

import './App.css';
import { useAgent } from './Forms/useAgent';
import { CssBaseline } from '@mui/material';
import NewAppBar from './common/NewAppBar'

function App() {
  const {isLoggedIn}=useAgent();
  if(isLoggedIn) console.log('true')
  return (
    <div className="App">
      <CssBaseline />
      <NewAppBar />
    </div>
  );
}

export default App;

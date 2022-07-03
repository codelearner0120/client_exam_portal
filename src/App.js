import './App.css';
import { useAgent } from './Forms/useAgent';
import { CssBaseline } from '@mui/material';
import NewAppBar from './common/NewAppBar'
import {useEffect} from 'react'

function App() {
  
  useEffect(() => {
    document.title='quiz portal'
  }, [])
  
  return (
    <div className="App">
      <CssBaseline />
      <NewAppBar />
    </div>
  );
}

export default App;

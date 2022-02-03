import logo from './logo.svg';
import './App.css';
import { Route,Router,Routes,Switch,Outlet } from 'react-router-dom';
import Home from './component/Home';
import SignIn from './component/SignIn';

function App() {
  return (
  <div className="App">
    <RoutesWrapper />
  </div>
  );
}
function RoutesWrapper(){
  console.log("1")
  return (

<Routes>
    <Route path="/" element={<Base/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
</Routes>
  );
}
const Base=()=>{
return(
  <div /* your crazy layout styling */ >
  <h1>This is the Guest Layout Page</h1>
  <Outlet /> 
</div>
)
}


export default App;

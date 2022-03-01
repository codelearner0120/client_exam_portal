import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes, Switch, Outlet } from 'react-router-dom';
import Home from './component/Home';
import SignIn from './component/SignIn';
import LoginForm from './Forms/LoginForm';
import RegistrationForm from './Forms/RegistrationForm';
import Appbar from './common/Appbar';
import NewUserForm from './component/NewUserForm';
import { useAgent } from './Forms/useAgent';
import { ThemeProvider } from '@mui/styles';
import theme from './Styles/Theme';
import { CssBaseline } from '@mui/material';
import Main from './Main';
function App() {
  const {isLoggedIn}=useAgent();
  console.log("user is login ",isLoggedIn())
  return (
    <div className="App">
   <CssBaseline />
   <Main />
    </div>
  );
}
function RoutesWrapper() {
  return (
    <>
    <Appbar />
    <Routes>
      {/* <Route path="/" element={<Appbar />}></Route> */}
      <Route exact path="/home" element={<Home />}></Route>
      <Route exact path="/login" element={<LoginForm />}></Route>
      <Route exact path="/register" element={<RegistrationForm />}></Route>
      <Route exact path="/newuser" element={<NewUserForm/>}></Route>
    </Routes>
    </>
  );
}
const Base = () => {
  return (
    <div /* your crazy layout styling */ >
      <h1>This is the Guest Layout Page</h1>
      <Outlet />
    </div>
  )
}


export default App;

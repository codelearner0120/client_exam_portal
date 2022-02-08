import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes, Switch, Outlet } from 'react-router-dom';
import Home from './component/Home';
import SignIn from './component/SignIn';
import LoginForm from './Forms/LoginForm';
import RegistrationForm from './Forms/RegistrationForm';
import Appbar from './common/Appbar';
import NewUserForm from './component/NewUserForm';

function App() {
  return (
    <div className="App">
      <RoutesWrapper />
    </div>
  );
}
function RoutesWrapper() {
  console.log("1")
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

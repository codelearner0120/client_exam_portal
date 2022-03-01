import React from 'react'
import { Route,Routes } from 'react-router-dom';
import DashBoard from '../DashBoards/DashBoard';
import Home from '../component/Home';
import LoginForm from '../Forms/LoginForm';
import RegistrationForm from '../Forms/RegistrationForm';
import NewUserForm from '../component/NewUserForm';

function AppRoute() {
  return (
    <>
        <Routes>
          <Route exact path="/" element={<DashBoard />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/login" element={<LoginForm />}></Route>
          <Route exact path="/register" element={<RegistrationForm />}></Route>
          <Route exact path="/newuser" element={<NewUserForm />}></Route>
        </Routes>
    </>
  )
}

export default AppRoute
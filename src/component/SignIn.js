import React from 'react';
import { Outlet } from 'react-router-dom';

function SignIn() {
  return <div>
      This is page
      <Outlet/>
  </div>;
}

export default SignIn;

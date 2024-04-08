import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Homepage from './Components/Homepage';
import LoginButton from "./LoginComponents/LoginButton"
import LogoutButton from "./LoginComponents/LogoutButton"


function App() {
  return (
    <div className="App">
      <h1>PROJECT 3 TEST </h1>
      <LoginButton />
      <LogoutButton />
      <Routes>
        {/* <Route path='/' element={<Homepage />} /> */}
        {/* <Route path='/profile' element={<Profile />} /> */}
      </Routes>

      {/* {Nav_Menu}
      {Homepage} */}

      {/* Test 2 for frontend branch */}
    </div>
  );
}

export default App;

import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import LoginButton from "./LoginComponents/LoginButton"
import LogoutButton from "./LoginComponents/LogoutButton"
import Profile from "./Components/Profile"
import GiftFinder from './Components/GiftFinder';
import Wishlist from './Components/Wishlist';
import Social from './Components/Social';
import NavMenu from './Components/NavMenu';

function App() {
  return (
    <div className="App">

      <LoginButton />
      <LogoutButton />
      <NavMenu />
      <Routes>
        <Route path="/" element={< Homepage/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/giftfinder' element={<GiftFinder />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/social" element={<Social />} />
      </Routes>

      {/* {Nav_Menu}
      {Homepage} */}





      {/* Test 2 for frontend branch */}
    </div>

  );
}

export default App;

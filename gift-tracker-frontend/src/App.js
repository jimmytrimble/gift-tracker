import * as React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { UserLog } from './UserLog';
import Homepage from './Components/Homepage';
import LoginButton from "./LoginComponents/LoginButton"
import LogoutButton from "./LoginComponents/LogoutButton"
import Profile from "./Components/Profile"
import GiftFinder from './Components/GiftFinder';
import Wishlist from './Components/Wishlist';
import Social from './Components/Social';
import NavMenu from './Components/NavMenu';
import styled from "styled-components";

const StyledBackground = styled.div`

  background-image: url("https://static.vecteezy.com/system/resources/previews/006/051/624/original/organic-abstract-pastel-shapes-background-minimalist-aesthetic-free-vector.jpg");
  height: 2000px;
`

function App() {
  const [isUserSaved, setIsUserSaved] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const { user, isAuthenticated } = useAuth0();


  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then(response => response.json())
      .then(data => {
        if (isAuthenticated) {
          let loggedUser = data.filter(databaseUser => databaseUser.username === user.nickname)
          // console.log("logged user is: ", loggedUser[0])
          // console.log("Users birthday is: ", loggedUser[0].birthdate)
          setLoggedInUser(loggedUser[0]);

        }
      })
  }, [isAuthenticated])


  return (
    <StyledBackground className="App">

      <LogoutButton />
      <NavMenu />
      <LoginButton />

      <UserLog.Provider value={{ isUserSaved, setIsUserSaved, loggedInUser, setLoggedInUser }}>

        <Routes>
          <Route path="/" element={< Homepage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/giftfinder' element={<GiftFinder />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/social" element={<Social />} />
        </Routes>
      </UserLog.Provider>

    </StyledBackground>

  );
}

export default App;

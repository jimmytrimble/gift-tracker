// Showing the calendar view with birthdays saved
// showing the user bio with their budget

import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from "styled-components";
import LoginForm from './LoginForm';
//import UserLog from '../UserLog';


const ProfileLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10px;
  margin: 10px;
`

const ProfileInfo = styled.form`

`

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  //const { text, setText } = useContext(UserLog);

  const updateProfile = () => {
    console.log("made it here")
  }


  if (isAuthenticated) {
    return (
      <>
        <ProfileLayout>
          {user?.picture && <img src={user.picture} alt={user?.name} />}
          <h2>{user?.namename}</h2>
          <ul>
            {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
          </ul>

        </ProfileLayout>


        <ProfileInfo>
          <h2>Update Profile</h2>
          {/* <h2>{text}</h2> */}
          <label htmlFor="birthday_name">Name:</label>
          <input type="text" id="birthday_name" /> <br />
          <label htmlFor="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" name="birthdate" /> <br />

          <button type="submit" onClick={updateProfile} >Save</button>

        </ProfileInfo>

        {/* <LoginForm /> */}

      </>


    )
  } else {
    return (
      <h2>No user logged in</h2>
    )
  }
}

export default Profile
// Showing the calendar view with birthdays saved
// showing the user bio with their budget

import { useAuth0 } from '@auth0/auth0-react';
import styled from "styled-components";
import LoginForm from './LoginForm';


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

  const updateProfile = () => {
    console.log("made it here")
  }


  if(isAuthenticated){
    return (
      <>
        <ProfileLayout>
          {user?.picture && <img src={user.picture} alt={user?.name} />}
          <h2>{user?.namename}</h2>
          <ul>
            {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
          </ul>

        </ProfileLayout>


      </>
    )
  } else {
    return (
      <>
      <h2>No user logged in</h2>

      <ProfileInfo>
        <label htmlfor="birthday_name">Name of Recipient:</label>
        <input type="text" id="birthday_name" /> <br />
        <label htmlfor="birthdate">Birthdate/Date of Event:</label>
        <input type="date" id="birthdate" name="birthdate" /> <br />

        <button type="submit" onClick={updateProfile} >Save</button>

      </ProfileInfo>

      <LoginForm />

    </>
    )
  }
}

export default Profile
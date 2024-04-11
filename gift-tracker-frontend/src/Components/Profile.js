// Showing the calendar view with birthdays saved
// showing the user bio with their budget

import React, { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from "styled-components";
import { UserLog } from '../UserLog';


const ProfileLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px;
`

const ProfileInfo = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Uimage= styled.div`
display: flex;
allign-item: right;
justify content: right;
`

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const { loggedInUser } = useContext(UserLog);
  const [interests, setInterests] = useState([]);

  const updateProfile = () => {

    console.log("Profile is being updated")
    let profileUpdateObj = {};
    profileUpdateObj.name = document.getElementById("formName").value;
    profileUpdateObj.image = 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG';
    profileUpdateObj.birthdate = document.getElementById("birthdate").value;
    //profileUpdateObj.interests = document.getElementById("formName").value;

    fetch(`http://localhost:8081/users/update/${loggedInUser.id.toString()}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileUpdateObj),
    })
      .then(response => console.log(response))
  }

  const interestChangeHandler = (event) => {
    if (interests.includes(event.target.value)) {

      setInterests(interests.filter(item => item !== event.target.value))
    } else {
      setInterests([...interests, event.target.value])
    }
  }


  if (isAuthenticated) {

    return (
      <>
        <ProfileLayout>
          <Uimage>{user?.picture && <img src={user.picture} alt={user?.name} />}</Uimage>
          <ul>
            {/* {Object.keys(loggedInUser).map((objKey, i) => <li key={i}>{objKey}: {loggedInUser[objKey]}</li>)} */}
            <li>{loggedInUser.name}</li>
            <li>{loggedInUser.birthdate}</li>
            <li>{loggedInUser.interests}</li>
          </ul>

        </ProfileLayout>


        <ProfileInfo>
          <h2>Update Profile</h2>
          <label htmlFor="birthday_name">Name:</label>
          <input type="text" id="formName" /> <br />
          <label htmlFor="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" name="birthdate" /> <br />

          <h3>Add your personal interests</h3>
          <div>
            <input type="checkbox" id="cooking" value="Cooking" onChange={interestChangeHandler} />
            <span>Cooking</span>
          </div>
          <div>
            <input type="checkbox" id="fashion" value="Fashion" onChange={interestChangeHandler} />
            <span>Fashion</span>
          </div>
          <div>
            <input type="checkbox" id="fitness" value="Fitness" onChange={interestChangeHandler} />
            <span>Fitness</span>
          </div>
          <div>
            <input type="checkbox" id="jewelry" value="Jewelry" onChange={interestChangeHandler} />
            <span>Jewelry</span>
          </div>
          <div>
            <input type="checkbox" id="outdoors" value="Outdoors" onChange={interestChangeHandler} />
            <span>Outdoors</span>
          </div>
          <div>
            <input type="checkbox" id="sports" value="Sports" onChange={interestChangeHandler} />
            <span>Sports</span>
          </div>

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
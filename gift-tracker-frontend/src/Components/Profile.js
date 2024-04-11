// Showing the calendar view with birthdays saved
// showing the user bio with their budget

import React, { useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from "styled-components";
import { UserLog } from '../UserLog';


const ProfileLayout = styled.div`
display: flex;
flex-flow: column;
justify-content:center;
justify-items:center;
align-content:center;
align-items: center;
padding: 10px;
gap: 15px;
margin: 20px;
left-margin: 40px
`

/*display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 5px;
`*/

const ProfileInfo = styled.form`

  align-item: center;
  justify-content: center;
  text-align: center;



`
const Uimage = styled.div`

position: absolute;
top: ${({ topOffset }) => topOffset || '0'}px; // Default to 0 if not specified
right: ${({ rightOffset }) => rightOffset || '0'}px; // Default to 0 if not specified
padding: 5px;
margin-bottom:40px
`

const Ilist = styled.li`
  margin-bottom:60px
`
const  Ibox = styled.div`
  display: flex;
  flex-flow: row;
  justify-content:center;
  justify-items:center;
  align-content:center;
  align-items: center;
  background-color: #96a6ef;
  color: white;
  width: 150px;
  height: 30px;
  border: 2px solid white;
  `
  const BoxWrap = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content:center;
  justify-items:center;
  align-content:center;
  align-items: center;
  padding: 10px;
  gap: 15px;
  margin: 20px;
  width: 800px;
  `


function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const { loggedInUser } = useContext(UserLog);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (document.getElementById("formName")) {
      let formName = document.getElementById("formName");
      formName.value = loggedInUser.name;
      let birthdate = document.getElementById("birthdate");
      birthdate.value = loggedInUser.birthdate.split('T')[0];

      loggedInUser.interests.includes('Cooking') ? document.getElementById("cooking").checked = true : console.log("does not contain Cooking")
      loggedInUser.interests.includes('Fashion') ? document.getElementById("fashion").checked = true : console.log("does not contain Fashion")
      loggedInUser.interests.includes('Fitness') ? document.getElementById("fitness").checked = true : console.log("does not contain Fintess")
      loggedInUser.interests.includes('Jewelry') ? document.getElementById("jewelry").checked = true : console.log("does not contain Jewelry")
      loggedInUser.interests.includes('Outdoors') ? document.getElementById("outdoors").checked = true : console.log("does not contain Outdoors")
      loggedInUser.interests.includes('Sports') ? document.getElementById("sports").checked = true : console.log("does not contain Sports")

      // let friendRelationship = document.getElementById("fashion").checked;
      // let coworkerRelationship = document.getElementById("fitness").checked;
      // let otherRelationship = document.getElementById("jewelry").checked;
      // let coworkerRelationship = document.getElementById("outdoors").checked;
      // let otherRelationship = document.getElementById("sports").checked;
    }

  }, [loggedInUser])

  const updateProfile = () => {

    console.log("Profile is being updated")
    let profileUpdateObj = {};
    profileUpdateObj.name = document.getElementById("formName").value;
    profileUpdateObj.image = 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG';
    profileUpdateObj.birthdate = document.getElementById("birthdate").value;

    let interestString = "";
    if (document.getElementById("cooking").checked) interestString += 'Cooking,'
    if (document.getElementById("fashion").checked) interestString += 'Fashion,'
    if (document.getElementById("fitness").checked) interestString += 'Fitness,'
    if (document.getElementById("jewelry").checked) interestString += 'Jewelry,'
    if (document.getElementById("outdoors").checked) interestString += 'Outdoors,'
    if (document.getElementById("sports").checked) interestString += 'Sports,'

    interestString === "" ? profileUpdateObj.interests = "No interests" : profileUpdateObj.interests = interestString.substring(0, interestString.length -1)



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


  if (Object.keys(loggedInUser).length !== 0) {
   return (
      <>
        <ProfileLayout>
          {user?.picture && <img src={user.picture} alt={user?.name} />}
        </ProfileLayout>
        <Uimage topOffset={200} rightOffset={120}>
          <ul>
            <Ilist>Name: {loggedInUser.name}</Ilist>
            <Ilist>Birthdate: {loggedInUser.birthdate.split('T')[0]}</Ilist>
            <Ilist>Interests: {loggedInUser.interests}</Ilist>
          </ul>
        </Uimage>



        <ProfileInfo>
          <h2>Update Profile</h2>
          <label htmlFor="birthday_name">Name:</label>
          <input type="text" id="formName" /> <br />
          <label htmlFor="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" name="birthdate" /> <br />

          <h3>Add your personal interests</h3>
          <BoxWrap>
            <Ibox>
              <input type="checkbox" id="cooking" value="Cooking" onChange={interestChangeHandler} />
              <span>Cooking</span>
            </Ibox>
            <Ibox>
              <input type="checkbox" id="fashion" value="Fashion" onChange={interestChangeHandler} />
              <span>Fashion</span>
            </Ibox>
            <Ibox>
              <input type="checkbox" id="fitness" value="Fitness" onChange={interestChangeHandler} />
              <span>Fitness</span>
            </Ibox>
            <Ibox>
              <input type="checkbox" id="jewelry" value="Jewelry" onChange={interestChangeHandler} />
              <span>Jewelry</span>
            </Ibox>
            <Ibox>
              <input type="checkbox" id="outdoors" value="Outdoors" onChange={interestChangeHandler} />
              <span>Outdoors</span>
            </Ibox>
            <Ibox>
              <input type="checkbox" id="sports" value="Sports" onChange={interestChangeHandler} />
              <span>Sports</span>
            </Ibox>
          </BoxWrap>

          <button type="submit" onClick={updateProfile} >Save</button>

        </ProfileInfo>
      </>
    )
  } else {
    return (
      <h2>No user logged in</h2>
    )
  }
}

export default Profile;
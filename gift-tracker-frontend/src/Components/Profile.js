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
  justify-items: center;
  align-item: center;
  justify-content: center;
  align-content: center;
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
display: flex;
  margin-bottom:60px;
  list-style-type: none;
  background-color: #8fafe2;
  color: #1734b6;
  font-weight: bold;
  justify-content:center;
  justify-items:center;
  align-content:center;
  align-items: center;
  padding: 15px;
  border: solid 2px white;
`
const Ibox = styled.div`
  display: flex;
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
  width: 100%;
  `
const StyledHeader = styled.h2`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content:center;
  align-items: center;
  color:#BF4F74;
  background-color: white;
  width:100%;

`

const StyledButton = styled.button`
    color: white;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    background-color: #BF4F74;
    padding: 0.25em 1em;
    width: 100px;
    height: 50px;
`

const StyledImage = styled.img`
  width: 400px;
  height: 400px;
  border: 8px solid white `

function Profile() {
  const { user } = useAuth0();
  const { loggedInUser } = useContext(UserLog);
  const [interests, setInterests] = useState([]);
  const [forceRender, setForceRender] = useState(false)

  useEffect(() => {
    console.log("rendering Profile, forceRender is: ", forceRender)
    if (document.getElementById("formName")) {
      let formName = document.getElementById("formName");
      formName.value = loggedInUser.name;
      let birthdate = document.getElementById("birthdate");
      birthdate.value = loggedInUser.birthdate.split('T')[0];

      if (loggedInUser.interests.includes('Cooking')) document.getElementById("cooking").checked = true
      if (loggedInUser.interests.includes('Fashion')) document.getElementById("fashion").checked = true
      if (loggedInUser.interests.includes('Fitness')) document.getElementById("fitness").checked = true
      if (loggedInUser.interests.includes('Jewelry')) document.getElementById("jewelry").checked = true
      if (loggedInUser.interests.includes('Outdoors')) document.getElementById("outdoors").checked = true
      if (loggedInUser.interests.includes('Sports')) document.getElementById("sports").checked = true

    }

  }, [loggedInUser, forceRender])

  // useEffect(() => {
  //   console.log("rendering Profile, forceRender is: ", forceRender)
  // }, [forceRender])

  const updateProfile = () => {

    let profileUpdateObj = {};
    profileUpdateObj.name = document.getElementById("formName").value;
    //profileUpdateObj.image = 'https://media.defense.gov/2019/Jul/26/2002163196/-1/-1/0/190726-F-ZZ999-011.JPG';
    profileUpdateObj.birthdate = document.getElementById("birthdate").value;

    let interestString = "";
    if (document.getElementById("cooking").checked) interestString += 'Cooking,'
    if (document.getElementById("fashion").checked) interestString += 'Fashion,'
    if (document.getElementById("fitness").checked) interestString += 'Fitness,'
    if (document.getElementById("jewelry").checked) interestString += 'Jewelry,'
    if (document.getElementById("outdoors").checked) interestString += 'Outdoors,'
    if (document.getElementById("sports").checked) interestString += 'Sports,'

    interestString === "" ? profileUpdateObj.interests = "No interests" : profileUpdateObj.interests = interestString.substring(0, interestString.length - 1)

    loggedInUser.interests = profileUpdateObj.interests;
    loggedInUser.name = profileUpdateObj.name;
    loggedInUser.birthdate = profileUpdateObj.birthdate;

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
        <StyledHeader>YOUR PROFILE</StyledHeader>
        <ProfileLayout>
          {user?.picture && <StyledImage src={user.picture} alt={user?.name} />}
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

          {/* <StyledButton onClick={() => setForceRender(true)} >Save</StyledButton> */}
          <StyledButton id='add-event-button' type="button" onClick={() => {
            updateProfile();
            setForceRender(!forceRender)
          }}>Save</StyledButton>

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
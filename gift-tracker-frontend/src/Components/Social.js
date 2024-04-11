import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import { UserLog } from '../UserLog';


const StyledDiv = styled.div`
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
const StyledButton = styled.button`
  display: flex;
    justify-content:center;
    justify-items:center;
    align-items:center;
    align-content:center;
    color: white;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    background-color: #BF4F74;
    margin: 0.5em 1em;
    padding: 0.25em 1em;
    width: 100px;
    height: 35px;
    left-margin: 30px;
`

const StyledHeader = styled.h2`
    display: flex;
    justify-content: center;
    justify-items: center;
    align-content:center;
    align-items: center;
    color:#BF4F74;

`

function Social() {
  const { isAuthenticated } = useAuth0();
  const { loggedInUser } = useContext(UserLog);
  const [friends, setFriends] = useState([]);
  const [userList, setUserList] = useState([])
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    setFriends([])
    //fetching the logged in user's information
    fetch('http://localhost:8081/users/1')
    .then(response => response.json())
    .then(data => {
      //splitting friends list by the comma
      setUserList(data.friendslist.split(","))
      return userList
      })
      //fetch each friends profile
    .then( splitFriends => {
      splitFriends.map( item => {
        fetch(`http://localhost:8081/users/${item}`)
        .then(response => response.json())
        //set friends state to the pulled user's profile data
        .then(data => setFriends(...friends, data))
      })
    })
  }, [])

  const findFriend = () => {
    const friend = document.getElementById("social-search").value;
    fetch("http://localhost:300/users")
    .then(response => response.json())
    .then(data => {
      setAllUsers(data);
      return allUsers;
    })
    .then( all => all)
  }

  if(isAuthenticated){
    return (
      <>
      <StyledDiv>
      <StyledHeader>Your Friend List</StyledHeader>
        {friends.map( item => {
          <StyledDiv>
          <h3>Name: {item.name}</h3> <br/>
          <h3>Username: {item.username}</h3>
          <img alt="friend" src={item.image} />
          <h3>Interests: {item.interests}</h3>

          </StyledDiv>
        })}
      </StyledDiv>
      <StyledDiv>
        <input id="social-search" type="text" placeholder="search username here"></input>
        <StyledButton id="social-search-button" onClick={findFriend}>Search</StyledButton>
      </StyledDiv>
      </>
    )
  } else {
    return (
      <h2>No user logged in</h2>
    )
  }

}


export default Social
import React from 'react';
import {useEffect, useState} from 'react';
import styled from 'styled-components';

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

function Social() {

  const [friends, setFriends] = useState([]);
  const [userList, setUserList] = useState([])

  useEffect(() => {
    fetch('http://localhost:8081/users/1')
    .then(response => response.json())
    .then(data => {
      setUserList(data.friendslist.split(","))
      return userList
      })
    .then( splitFriends => {
      splitFriends.map( item => {
        fetch(`http://localhost:8081/users/${item}`)
        .then(response => response.json())
        .then(data => setFriends(...friends, data))
      })
    })
  })

  return (
    <StyledDiv>
    <h2>Your Friends</h2>
      {friends.map( item => {
        <StyledDiv>
        <h3>Name: {item.name}</h3> <br/>
        <h3>Username: {item.username}</h3>
        <img alt="friend" src={item.image} />
        <h3>Interests: {item.interests}</h3>

        </StyledDiv>
      })}
    </StyledDiv>
  )
}


export default Social
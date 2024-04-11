import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useEffect, useState, useContext } from 'react';
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
    gap: 2px;
    margin: 20px;
    left-margin: 40px
`

const ColorDiv = styled.div`
  display: flex;
    flex-flow: column;
    justify-content:center;
    justify-items:center;
    align-content:center;
    align-items: center;
    background-color: #c0d3c2;
    width: 750px;
    padding: 25px;
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
  const [userList, setUserList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [foundFriend, setFoundFriend] = useState();
  const [didSearch, setDidSearch] = useState(0);

  useEffect(() => {
    console.log("isAuthenticated: ", isAuthenticated)

    if (isAuthenticated) {
      console.log(loggedInUser)
      let testUserList = loggedInUser.friendslist.split(",")

      //fetch each friends profile
      testUserList.map(item => {
        fetch(`http://localhost:8081/users/${item}`)
          .then(response => response.json())
          //set friends state to the pulled user's profile data
          .then(data => {
            console.log("second fetch data", data[0])
            const exists = friends.find(friend => friend.id === data[0].id)
            if (!exists)
              setFriends(prevFriends => [...prevFriends, data[0]])
          })
      })
    }
  }, [loggedInUser])

  const findFriend = () => {
    const friend = document.getElementById("social-search").value;
    console.log("friend", friend)
    fetch("http://localhost:8081/users")
      .then(response => response.json())
      .then(data => {
        setAllUsers(data);
        console.log("data", data)
        return allUsers;
      })
      .then(all => {
        setFoundFriend(all.filter( item => item.username === friend))
        console.log("foundfreind", foundFriend)
        setDidSearch(1);
      })
  }

  if (isAuthenticated) {
    return (
      <>
        <StyledDiv>
          <StyledHeader>{loggedInUser.name}'s Friend List</StyledHeader>
          {console.log("friends in redner: ", friends)}
          <StyledDiv>
            {friends.map(item => (
              <ColorDiv key={item.id}>
                <img alt="friend" src={item.image} />
                <p>{item.name}</p>
                <p>Username: {item.username}</p>
                <p>Interests: {item.interests}</p>
                <p>Bio: {item.bio}</p>
              </ColorDiv>
            ))}
          </StyledDiv>
        </StyledDiv>
        <StyledDiv>
          <input id="social-search" type="text" placeholder="search username here"></input>
          <StyledButton id="social-search-button" onClick={findFriend}>Search</StyledButton>
        </StyledDiv>
        <StyledDiv>
        {didSearch > 0 ?
          foundFriend.map(item => (
            <ColorDiv>
                <img alt="friend" src={item.image} />
                <p>{item.name}</p>
                <p>Username: {item.username}</p>
                <p>Interests: {item.interests}</p>
                <p>Bio: {item.bio}</p>
                <StyledButton>Add Friend</StyledButton>
            </ColorDiv>
          ))
        :
        <></>
      }
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
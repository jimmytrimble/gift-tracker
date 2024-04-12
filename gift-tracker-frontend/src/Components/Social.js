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

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
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
    padding: 15px;
    border: 4px solid white;
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

const StyledP = styled.p`
display: flex;
justify-content: center;
justify-items: center;
align-content:center;
align-items: center;
color:#1734b6;
font-weight: bold;
`
const StyledWishlist = styled.div`
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
    left-margin: 40px
    width: 90%;
`
function Social() {
  const { isAuthenticated } = useAuth0();
  const { loggedInUser } = useContext(UserLog);
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [foundFriend, setFoundFriend] = useState();
  const [didSearch, setDidSearch] = useState(0);
  const [friendWish, setFriendWish] = useState([]);

  useEffect(() => {

    if (isAuthenticated) {
      let userList = loggedInUser.friendslist.split(",")

      //fetch each friends profile
      userList = userList.filter(item => Number.isInteger(parseInt(item)))
      userList.map(item => {
        fetch(`http://localhost:8081/users/${item}`)
          .then(response => response.json())
          //set friends state to the pulled user's profile data
          .then(data => {
            const exists = friends.find(friend => friend.id === data.id)
            if (!exists)
              setFriends(prevFriends => [...prevFriends, data[0]])
          })
      })
    }
  }, [loggedInUser])

  const findFriend = () => {
    const friend = document.getElementById("social-search").value;
    fetch("http://localhost:8081/users")
      .then(response => response.json())
      .then(data => {
        setAllUsers(data);
        return allUsers;
      })
      .then(all => {
        setFoundFriend(all.filter( item => item.username === friend))
        setDidSearch(1);
      })
  }

  const showWishlist = (userID) =>{
    fetch(`http://localhost:8081/wishlist/${userID}`)
    .then(response => response.json())
    .then(data => setFriendWish(prevWish => (
      {
        ...prevWish,
        [userID]: data
      }
    )))

  }


  const addFriend = (userID) => {
    const status = document.getElementById("add-friend-button");
    fetch(`http://localhost:8081/update/friends/${loggedInUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({friendToAdd: userID})
    })
      .then(() => {
        status.innerHTML = "Friend Added!";
        document.location.reload();
      })
  }

  if (isAuthenticated) {
    return (
      <>
        <StyledDiv>
          <StyledHeader>{loggedInUser.name}'s Friend List</StyledHeader>
          <StyledDiv>
            {friends.map(item => (
              <ColorDiv key={item.id}>
                <StyledImage alt="friend" src={item.image} />
                <StyledP>{item.name}</StyledP>
              <StyledP>Username: {item.username}</StyledP>
                <StyledP>Interests: {item.interests}</StyledP>
                <StyledP>Bio: {item.bio}</StyledP>
                <StyledButton onClick={ () => showWishlist(item.id)}>Show Their Wishlist</StyledButton>
                <StyledWishlist>
                  {friendWish[item.id] && friendWish[item.id].map(eachItem => {
                    return(
                    <StyledDiv>
                    <StyledImage className="wishlist-image" src={eachItem.image} alt='gift' />
                    <StyledHeader>{eachItem.gifts}</StyledHeader>
                    </StyledDiv>
                    )
                  })}
                </StyledWishlist>
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
                <StyledImage alt='🎁' src={item.image} />
                <StyledP>{item.name}</StyledP>
                <StyledP>Username: {item.username}</StyledP>
                <StyledP>Interests: {item.interests}</StyledP>
                <StyledP>Bio: {item.bio}</StyledP>
                <StyledButton id="add-friend-button" onClick = {() => addFriend(item.id)}>Add Friend</StyledButton>
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
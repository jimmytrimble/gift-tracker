import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { UserLog } from '../UserLog';
const BasicDiv = styled.div`
display: flex;
    flex-flow: column;
    justify-content:center;
    justify-items:center;
    align-content:center;
    align-items: center;
`
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
    width: 300px;
    background-color: #c0d3c2;
`
const StyledSearchResults = styled.div`
  display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content:center;
    justify-items:center;
    align-content:center;
    align-items: center;
    width: 80%;
`

const StyledItem = styled.div`
    display: flex;
    flex-flow: column;
    justify-content:center;
    justify-items:center;
    align-content:center;
    align-items: center;
    padding: 10px;
    gap: 15px;
    margin: 20px;
    width: 300px;
    background-color: #c0d3c2;
`
const StyledP = styled.p`
  display: flex;
  flex-flow: column;
  justify-content:center;
  justify-items:center;
  align-content:center;
  align-items: center;
  color: #1937c1;
  font-size: large;
  font-weight: bold
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

const StyledImage = styled.img`
  height: 200px;
  width: 200px;
  border: 3px solid #96a6ef;
`
const StyledForm = styled.form`
    display: flex;
    flex-flow: column;
    justify-content:center;
    justify-items:center;
    align-items:center;
    align-content:center;
    padding: 10px;
    gap: 15px;
    margin: 20px;
    width: 200px;
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
    height: 50px;
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

const InnerDiv = styled.div`
    display: flex;
    flex-flow: column;
    justify-content:center;
    justify-items:center;
    align-items:center;
    align-content:center;
`

function Wishlist() {

  const [allGifts, setAllGifts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { isAuthenticated } = useAuth0();
  const { loggedInUser } = useContext(UserLog);
  const [foundItem, setFoundItem] = useState({});
  const [searchItem, setSearchItem] = useState('');
  const [link, setLink] = useState('');
  const [didSearch, setDidSearch] = useState(0)

  const getLink = (gift_title) => {
    fetch(`http://localhost:8081/search?query=${gift_title}`)
      .then(response => response.json())
      .then(data => {
        setFoundItem(data);
        console.log("found item", foundItem)
        setLink(`http://amazon.com/s?k=${gift_title}`)
        setDidSearch(1);
      })
  }

  const addWishlist = (gift) => {
    const status = document.getElementById("add-wishlist")
    gift.image = gift.image || gift.imageUrl;
    fetch(`http://localhost:8081/update/wishlist/${loggedInUser.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ gifts: gift.title, image: gift.image })
    })
      .then(() => {
        status.innerHTML = "Gift Added to Wishlist!";
        document.location.reload();
      })
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetch('http://localhost:8081/admin/gifts')
        .then(response => response.json())
        .then(data => {
          console.log("all Gifts", data)
          setAllGifts(data.map(item => item))
          fetch(`http://localhost:8081/wishlist/${loggedInUser.id}`)
            .then(response => response.json())
            .then(data => {
              console.log("user wishlist", data)
              setWishlist(data)
              return wishlist
            })
          // .then(setWishlist(wishlist.filter(item => allGifts.map( item => item.title.toLowerCase()).includes(item.gifts.toLowerCase())
          // )))

        })
    }
  }, [loggedInUser])

  const findGift = (e) => {

    setSearchQuery(e.toLowerCase());
    setSearchResults(allGifts.filter(item =>
      item.title.toLowerCase().includes(searchQuery)
    ))
  }

  if (Object.keys(loggedInUser).length !== 0) {
    return (
      <>
        <StyledHeader>{loggedInUser.name}'s Wishlist:</StyledHeader>
        <StyledWishlist>
          {wishlist.map(item => {
            return (
              <StyledDiv>
                <StyledImage className="wishlist-image" src={item.image} alt='gift' />
                <StyledHeader>{item.gifts}</StyledHeader>
              </StyledDiv>
            )
          })}
        </StyledWishlist>
        <BasicDiv>
          <StyledForm>
            <input type="text" id="search-bar" onInput={(e) => {
              findGift(e.target.value)
              setSearchItem(e.target.value)
            }} label="Search an Item" />
          </StyledForm>
          <StyledHeader id="add-wishlist">Search a Gift to Add to Your Wishlist</StyledHeader>
        </BasicDiv>

        <div id="item-container">
          {searchQuery && searchQuery.length > 0 ? (
            searchResults && searchResults.length > 0 ? (
              searchResults.map((item) => (
                <StyledDiv className='single-gift' >
                  <img className="wishlist-search" src={item.image} alt='gift' width="250" />
                  <p>{item.title}</p>
                  <StyledButton id="add-wishlist" onClick={() => addWishlist(item)}>Add To Your Wishlist</StyledButton>
                </StyledDiv>
              ))
            ) : (
              <StyledDiv>
                <StyledP>No results in our database, click SEARCH </StyledP>
                <StyledButton onClick={() => getLink(searchItem)}>Search!</StyledButton>
                {didSearch > 0 ?
                  <StyledSearchResults>
                    {foundItem.map(item => (
                      <StyledItem>
                        <h2>{item.title}</h2>
                        <img src={item.imageUrl} alt="founditem" />
                        <a href={item.ebayUrl} target="_blank">Click to Buy from EBAY</a>
                        <a href={link} target="_blank">Click to Buy from AMAZON</a>
                        <StyledButton onClick={() => addWishlist(item)} id="add-wishlist">Add To Your Wishlist</StyledButton>
                      </StyledItem>
                    ))}
                  </StyledSearchResults>
                  :
                  <></>}

              </StyledDiv>
            )
          ) : (
            <StyledDiv>
            </StyledDiv>
          )}
        </div>
      </>
    )
  } else {
    return (
      <h2>No user logged in</h2>
    )
  }
}

export default Wishlist;
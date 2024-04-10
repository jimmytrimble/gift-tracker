import React from 'react';
import {useEffect, useState} from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    flex-flow: column;
    justify-content:center;
    align-content:center;
    padding: 10px;
    gap: 15px;
    margin: 20px;
    border: 2px solid pink
`
const StyledForm = styled.form`
    display: flex;
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
    width: 10%;
    left-margin: 30px;
`

const StyledHeader = styled.h2`
    display: flex;
    justify-content:center;
    align-content:center;
`

function Wishlist() {

  const [allGifts, setAllGifts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [link, setLink] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getLink = (gift_title) => {
    setLink(`amazon.com/s?k=${gift_title}`)
  }

  useEffect (() => {
    fetch('http://localhost:8081/admin/gifts')
    .then( response => response.json())
    .then(data => {
      console.log("all Gifts", data)
      setAllGifts(data.map(item => item.title.toLowerCase()))})

    // fetch(`http://localhost:8081/wishlist/${userID}`)
    // .then(response => response.json())
    // .then(data => setWishlist(data))

  },[])

  const findGift = (e) => {
    setSearchQuery(e.toLowerCase());
    setSearchResults(allGifts.filter(item =>
      item.title === searchQuery
    ))
  }


  return (
    <>
    <StyledForm>
    <input type="text" id="search-bar" onInput={(e) => findGift(e.target.value)} label="Search an Item" />
    </StyledForm>

    <div id="item-container">
    {searchQuery && searchQuery.length > 0 ? (
        searchResults && searchResults.length > 0 ? (
          searchResults.map((item) => (
            <StyledDiv className = 'single-gift' >
             <h2>{item.title}</h2>
              <img className="gift-image" src={item.image} alt='gift' width="250" />
              <StyledButton id="add-wishlist">Add To Your Wishlist</StyledButton>
           </StyledDiv>
          ))
        ) : (
          <p>No results found.</p>
        )
      ) : (
        <StyledButton id="add-wishlist">Add To Your Wishlist</StyledButton>
        )}
    </div>
    </>
  )
}

export default Wishlist;
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
    height: 75px;
    left-margin: 30px;
`

const StyledHeader = styled.h2`
    display: flex;
    justify-content:center;
    justify-items:center;
    align-items:center;
    align-content:center;
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
  const [link, setLink] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getLink = (gift_title) => {
    setLink(`http://amazon.com/s?k=${gift_title}`)
  }

  useEffect (() => {
    fetch('http://localhost:8081/admin/gifts')
    .then( response => response.json())
    .then(data => {
      console.log("all Gifts", data)
      setAllGifts(data.map(item => item))
        fetch('http://localhost:8081/wishlist/2')
        .then( response => response.json())
        .then(data => {
          console.log("user wishlist", data)
          setWishlist(data.map(item => item))
          return wishlist})
        .then(setWishlist(wishlist.filter(item => allGifts.map( item => item.title.toLowerCase()).includes(item.gifts.toLowerCase())
        )))

        })
  },[])

  const findGift = (e) => {

    setSearchQuery(e.toLowerCase());
    setSearchResults(allGifts.filter(item =>
      item.title.toLowerCase().includes(searchQuery)
    ))
  }


  return (
    <>
    <StyledHeader>Your Wishlist:</StyledHeader>
    {wishlist.map(item => {
      return(
      <>
      <StyledHeader>{item.gifts}</StyledHeader>
      <img className="wishlist-image" src={item.image} alt='gift' />
      </>
      )
    })}
        <StyledDiv>
           <StyledForm>
            <input type="text" id="search-bar" onInput={(e) => {
              findGift(e.target.value)
              getLink(e.target.value)
                }} label="Search an Item" />
          </StyledForm>
          <StyledHeader id="add-wishlist">Search a Gift to Add to Your Wishlist</StyledHeader>
        </StyledDiv>

        <div id="item-container">
    {searchQuery && searchQuery.length > 0 ? (
        searchResults && searchResults.length > 0 ? (
          searchResults.map((item) => (
            <StyledDiv className = 'single-gift' >
             <h2>{item.title}</h2>
              <img className="wishlist-search" src={item.image} alt='gift' width="250" />
              <StyledButton id="add-wishlist">Add To Your Wishlist</StyledButton>
           </StyledDiv>
          ))
        ) : (
          <StyledDiv>
          <p>No results in our database, here is a link to find your item</p>
          <a href={link}> Click Here </a><br/>

          <p>Please add your item into our database to make our site better!</p>
          <StyledForm>
            <InnerDiv>
              <label htmlfor="add-wishlist-title">Title of Item:</label>
              <input type="text" id="add-wishlist-title" onInput={(e) => getLink(e.target.value)}/> <br />
            </InnerDiv>
            <InnerDiv>
               <label htmlfor="add-wishlist-image">Paste a URL image of the Item:</label>
                <input type="text" id="add-wishlist-image"  /> <br />
            </InnerDiv>
            <InnerDiv>
               <label htmlfor="add-wishlist-link">Paste Link to the Item:</label>
                <input type="text" id="add-wishlist-link"  /> <br />
            </InnerDiv>
          </StyledForm>
          <StyledButton id="add-wishlist">Add To Your Wishlist</StyledButton>
          </StyledDiv>
        )
      ) : (
        <StyledDiv>
        </StyledDiv>
        )}
    </div>
    </>
  )
}

export default Wishlist;
import React from 'react';
import {useEffect, useState} from 'react';
import styled from 'styled-components';

// API is built on PORT 8081

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

const GiftFinder = () => {

  const [interests, setInterests] = useState([]);
  const [allGifts, setAllGifts] = useState([]);
  const [suggestions, setSuggestions] = useState ([]);


useEffect (() => {
  fetch('http://localhost:8081/admin/gifts')
  .then( response => response.json())
  .then(data => {
    console.log("all Gifts", data)
    setAllGifts(data)})
  }, [])

  const filterPrice = () => {
    const priceRange = parseInt(document.getElementById("price-range").value);

    setSuggestions(allGifts.filter(item => item.price === priceRange))

  }

  const interestChangeHandler = (event) => {
    if(interests.includes(event.target.value)) {

      setInterests(interests.filter(item => item !== event.target.value))
    } else{
      setInterests([...interests, event.target.value])
    }


  }
  const filterInterests = async() => {
    const newItems = allGifts.filter( item => interests.includes(item.interests));
    await setSuggestions(newItems)
  }

  return(
    <>
    <StyledDiv className="price-range">
      <h2>What price range would you like to stay in?</h2>
      <select inputid='price-range' id='price-range'>
        <option value='1'>$0-$25</option>
        <option value='2'>$25-$50</option>
        <option value='3'>$100+</option>
      </select>
      <StyledButton type="submit" onClick={filterPrice}>Filter Price</StyledButton>
    </StyledDiv>

   <StyledDiv className="interests">
    <h2>What interests does this person have?</h2>
      <div>
        <input type="checkbox" id="sports" value="Sports" onChange={interestChangeHandler}/>
        <span>Sports</span>
      </div>
      <div>
        <input type="checkbox" id="jewelry" value="Jewelry" onChange={interestChangeHandler}/>
         <span>Jewelry</span>
      </div>
        <div>
          <input type="checkbox" id="cooking" value="Cooking" onChange={interestChangeHandler}/>
          <span>Cooking</span>
        </div>
    <StyledButton type="submit" onClick={filterInterests}>Filter Interests</StyledButton>
   </StyledDiv>

   <StyledDiv className = 'gift results'>
    {suggestions.map(item => {
      return(
      <>
        <h2> Here are your gift suggestions! </h2>
        <StyledDiv className='giftItem' >
          <h2>{item.title}</h2>
          <img id='gift-pic' src={item.image} alt='gift' />
          <a href={item.link}>Buy Here</a>
        </StyledDiv>
      </>
      )
    })}
   </StyledDiv>
    </>
  )
}
export default GiftFinder;
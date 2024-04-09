import React from 'react';
import {useEffect, useState} from 'react';

// API is built on PORT 8081


const GiftFinder = () => {

  const [price, setPrice] = useState(0);
  const [interests, setInterests] = useState(['']);
  const [allGifts, setAllGifts] = useState([]);
  const [suggestions, setSuggestions] = useState ([]);


useEffect = async () => {
  fetch('http://localhost:8081/gifts')
  .then( response => response.json())
  .then( data => setAllGifts(data) )
  }

  const filterPrice = () => {
    const priceRange = parseInt(document.getELementById("price-range").value);

    setSuggestions(allGifts.filter(item => item.price === priceRange))

  }

  const interestChangeHandler = (event) => {
    if(interests.includes(event.target.value)) {
      if(interests.length === 1) {
        setInterests([])
      }
      setInterests(interests.filter(item => item !== event.target.value))
    } else{
      setInterests([...interests, event.target.value])
    }


  }


  const filterInterests = () => {
    setSuggestions(allGifts.filter( item => interests.includes(item.interest)))
  }

  return(
    <>
    <div className="price-range">
      <h2>What price range would you like to stay in?</h2>
      <select inputid='price-range' id='price-range'>
        <option value='1'>$0-$25</option>
        <option value='2'>$25-$50</option>
        <option value='3'>$100+</option>
      </select>
      <button type="submit" onClick={filterPrice}>Submit</button>
    </div>

   <div className="interests">
    <h2>What interests does this person have?</h2>
    <select id="interests">
        <checkbox value="sports" onChange={interestChangeHandler}>Sports</checkbox>
        <checkbox value="jewelry" onChange={interestChangeHandler}>Jewelry</checkbox>
        <checkbox value="cooking" onChange={interestChangeHandler}>Cooking</checkbox>
    </select>
    <button type="submit" onClick={filterInterests}>Submit</button>
   </div>

   <div className = 'gift results'>
    {suggestions.map(item => {
      <>
        <div className='giftItem' >
          <h2>{item.title}</h2>
          <img id='gift-pic' src={item.image} alt='gift' />
          <a href={item.link}>Buy Here</a>
        </div>
      </>
    })}

   </div>
    </>
  )



}
export default  GiftFinder;
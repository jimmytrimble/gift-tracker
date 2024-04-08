import React from 'react';
import {useEffect, useState} from 'react';

// API is built on PORT 8081


const Gift_Finder = () => {

  const [price, setPrice] = useState(0);
  const [interests, setInterests] = useState(['']);
  const [allGifts, setAllGifts] = useState([]);
  const [suggestions, setSuggestions] = useState ([]);


useEffect = async () => {
  fetch('http://localhost:8081/gifts')
  .then( response => response.json())
  .then( data => setAllGifts(data) )

  //need this to respond with data to filter out the interests and price range
  //setInterests(data.interests.map(item => item))
  //setPrice(data.price)
  }

  const filterPrice = () => {
    const priceRange = parseInt(document.getELementById("price-range").value);

    setSuggestions(allGifts.filter(item => item.price === priceRange))

  }

  const filterInterests = (event) => {
    const clickedInterest = event.target.value;




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
        <checkbox value="sports" onChange={filterInterests}>Sports</checkbox>
        <checkbox value="jewelry" onChange={filterInterests}>Jewelry</checkbox>
        <checkbox value="cooking" onChange={filterInterests}>Cooking</checkbox>
    </select>


   </div>
    </>
  )



}
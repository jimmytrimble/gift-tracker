import React from 'react';
import {useEffect, useState} from 'react';

// API is built on PORT 8081

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
    <button type="submit" onClick={filterInterests}>Submit</button>
   </div>

   <div className = 'gift results'>
    {suggestions.map(item => {
      return(
      <>
        <h2> Here are your gift suggestions! </h2>
        <div className='giftItem' >
          <h2>{item.title}</h2>
          <img id='gift-pic' src={item.image} alt='gift' />
          <a href={item.link}>Buy Here</a>
        </div>
      </>
      )
    })}
   </div>
    </>
  )
}
export default GiftFinder;
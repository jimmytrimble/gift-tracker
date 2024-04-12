import React from 'react';
import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { UserLog } from '../UserLog';

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
const CheckboxDiv = styled.div`
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
    width: 800px;
`

const StyledOption = styled.div`
  display: flex;
  flex-flow: row;
  justify-content:center;
  justify-items:center;
  align-content:center;
  align-items: center;
  background-color: #96a6ef;
  color: white;
  width: 150px;
  height: 30px;
  border: 2px solid white;
`
const StyledSelect = styled.select`
display: flex;
  flex-flow: row;
  justify-content:center;
  justify-items:center;
  align-content:center;
  align-items: center;
  background-color: #96a6ef;
  color: white;
  width: 150px;
  height: 30px;
  border: 2px solid white;
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
    width: 100px;
    height: 35px;
`

const StyledImage = styled.img`
  height: 200px;
  width: 200px;
`

const ResultsDiv = styled.div`
  display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content:center;
    justify-items:center;
    align-content:center;
    align-items: center;
    padding: 10px;
    gap: 15px;
    margin: 10px;
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
  flex-flow: column;
  justify-content:center;
  justify-items:center;
  align-content:center;
  align-items: center;
  color: #1937c1;
  font-size: large;
  font-weight: bold
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
const GiftFinder = () => {

  const [interests, setInterests] = useState([]);
  const [allGifts, setAllGifts] = useState([]);
  const [priceSuggestions, setPriceSuggestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [foundItem, setFoundItem] = useState({});
  const [searchItem, setSearchItem] = useState('');
  const [link, setLink] = useState('');
  const [didSearch, setDidSearch] = useState(0)
  const { loggedInUser } = useContext(UserLog);

  useEffect(() => {
    fetch('http://localhost:8081/admin/gifts')
      .then(response => response.json())
      .then(data => {
        console.log("all Gifts", data)
        setAllGifts(data)
      })
  }, [])

  const filterPrice = () => {
    const priceRange = parseInt(document.getElementById("price-range").value);
    if (priceRange > 0) {
      setPriceSuggestions(allGifts.filter(item => item.price === priceRange))
      filterInterests()
    }
    else {
      setPriceSuggestions(allGifts)
      filterInterests()
    }
  }

  const interestChangeHandler = (event) => {
    if (interests.includes(event.target.value)) {
      setInterests(interests.filter(item => item !== event.target.value))
    } else {
      setInterests([...interests, event.target.value])
    }


  }
  const filterInterests = async () => {
    if (interests.length > 0) {
      const newItems = priceSuggestions.filter(item => interests.includes(item.interests));
      console.log("newItems", newItems)
      await setSuggestions(newItems)
    }
    else {
      await setSuggestions(priceSuggestions)
    }
  }
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
  if (Object.keys(loggedInUser).length !== 0) {
    return (
      <>
        <StyledDiv className="price-range">
          <StyledHeader>What price range would you like to stay in?</StyledHeader>
          <StyledSelect inputid='price-range' id='price-range' onChange={filterPrice}>
            <option value='0'>N/A</option>
            <option value='1'>$0-$25</option>
            <option value='2'>$25-$100</option>
            <option value='3'>$100+</option>
          </StyledSelect>
        </StyledDiv>
        <StyledHeader>What interests does this person have?</StyledHeader>
        <StyledDiv>
          <CheckboxDiv className="interests">
            <StyledOption>
              <input type="checkbox" id="cooking" value="cooking" onChange={interestChangeHandler} />
              <span>Cooking</span>
            </StyledOption>
            <StyledOption>
              <input type="checkbox" id="fashion" value="fashion" onChange={interestChangeHandler} />
              <span>Fashion</span>
            </StyledOption>
            <StyledOption>
              <input type="checkbox" id="fitness" value="fitness" onChange={interestChangeHandler} />
              <span>Fitness</span>
            </StyledOption>
            <StyledOption>
              <input type="checkbox" id="jewelry" value="jewelry" onChange={interestChangeHandler} />
              <span>Jewelry</span>
            </StyledOption>
            <StyledOption>
              <input type="checkbox" id="outdoors" value="outdoors" onChange={interestChangeHandler} />
              <span>Outdoors</span>
            </StyledOption>
            <StyledOption>
              <input type="checkbox" id="sports" value="sports" onChange={interestChangeHandler} />
              <span>Sports</span>
            </StyledOption>
          </CheckboxDiv>
          <StyledButton type="submit" onClick={filterPrice}>Find a Gift!</StyledButton>
        </StyledDiv>
        <StyledDiv className='gift results'>
          <ResultsDiv >

            {suggestions.map(item => {
              return (
                <>
                  <StyledDiv className='giftItem' >
                    <h2>{item.title}</h2>
                    <StyledImage id='gift-pic' src={item.image} alt='gift' />
                    <a href={item.link} target="_blank">Buy Here</a>
                  </StyledDiv>
                </>
              )
            })}

            <StyledDiv>
              <StyledP>Don't like the results in our database? SEARCH any item!</StyledP>
              <input type="text" id="search-bar" onInput={(e) => {
                setSearchItem(e.target.value)
              }} label="Search an Item" />
              <StyledButton onClick={() => getLink(searchItem)}>Search!</StyledButton>
              {didSearch > 0 ?
                <StyledSearchResults>
                  {foundItem.map(item => (
                    <StyledDiv>
                      <h2>{item.title}</h2>
                      <img src={item.imageUrl} alt="founditem" />
                      <a href={item.ebayUrl} target="_blank">Click to Buy from EBAY</a>
                      <a href={link} target="_blank">Click to Buy from AMAZON</a>
                    </StyledDiv>
                  ))}
                </StyledSearchResults>
                :
                <></>}

            </StyledDiv>
          </ResultsDiv>
        </StyledDiv>
      </>
    )
  } else {
    return (
      <h2>No user logged in</h2>
    )
  }
}
export default GiftFinder;
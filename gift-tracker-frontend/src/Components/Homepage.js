// Inital login page
import React, { useState, useEffect, useContext } from 'react';
import { css, styled } from 'styled-components';
import LoginForm from './LoginForm';
import { useAuth0 } from '@auth0/auth0-react';
import Calendar from "./Calendar";
import { UserLog } from '../UserLog';
//import  background2 from './images/background2';

// export const RecommendItem = styled.div`
// background: url(${background2?.src});
// `;

const StyledDiv = styled.div`
    display: flex;
    flex-flow: column;
    justify-content:center
    justify-items: center;
    align-content:center;
    align-items: center;
    padding: 10px;
    gap: 15px;
    margin: 20px;
`

const NewGift = styled.div`
    display: flex;
    flex-flow: column;
    justify-content:center
    justify-items: center;
    align-content:center;
    align-items: center;
    padding: 10px;
    gap: 15px;
    margin-left: 20%;
    margin-right: 20%;
    background-color: #f9a852;
    border: 2px solid white;
`

const InnerDiv = styled.div`
    display: flex;
    justify-content:center
    justify-items: center;
    align-content:center;
    align-items: center;
`

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
    color: white;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    background-color: #BF4F74;
    margin: 2px;
    padding: 5px;
    width: 75px;
`
const StyledHeader = styled.h2`
    display: flex;
    justify-content:center
    justify-items: center;
    align-content:center;
    align-items: center;
`

const StyledLI = styled.li`
display: flex;
    justify-content:center
    justify-items: center;
    align-content:center;
    align-items: center;
    list-style-image: 🎁;
`

function Homepage() {
    const { user, isAuthenticated } = useAuth0();
    const { isUserSaved, setIsUserSaved, loggedInUser, setLoggedInUser } = useContext(UserLog);
    const [addPressed, setAddPressed] = useState(0);
    const [birthdayData, setBirthdayData] = useState([]);
    const [allData, setAllData] = useState([]);
    const months = ["January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"];




    const checkUserData = () => {
        setIsUserSaved(true);
    }

    const submitEvent = () => {
        let eventName = document.getElementById("birthday_name").value;
        let date = document.getElementById("birthdate").value;
        let familyRelationship = document.getElementById("family").checked;
        let friendRelationship = document.getElementById("friend").checked;
        let coworkerRelationship = document.getElementById("coworker").checked;
        let otherRelationship = document.getElementById("other").checked;


        let relationship = otherRelationship;

        if (familyRelationship) {
            relationship = 'family';
        } else if (friendRelationship) {
            relationship = 'friend';
        } else if (coworkerRelationship) {
            relationship = 'coworker';
        }


        const event = {
            name: eventName,
            //user_id: loggedInUser.id,
            birthdate: date,
            relationship: relationship
        };

        fetch('http://localhost:8081/birthday/new', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
            .then(response => console.log(response))
        // .then(data => {
        //     console.log('Success:', data);
        //     // Optionally reset form, or navigate elsewhere, or update UI
        // })
        // .catch((error) => {
        //     console.log('Error:', error);
        // });
        // Optionally, reset addPressed to show the button again, or handle UI feedback in another way
        //setAddPressed(0);
    }

    // useEffect to fetch data on component mount
    useEffect(() => {
        fetch('http://localhost:8081/birthday')
            .then(response => response.json())
            .then(data => {
                setAllData(data.sort((p1, p2) => (Date.parse(p1.birthdate) - Date.parse(p2.birthdate))));
                setBirthdayData(allData.map(item => {
                    const splitTime = item.birthdate.split("T");
                    const splitDate = splitTime[0].split("-")
                    const monthIndex = parseInt(splitDate[1]) -1;
                    splitDate[1] = months[monthIndex];
                    item.birthdate = `${splitDate[1]} ${splitDate[2]}`;
                    return item
                }))
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [isAuthenticated]); // Empty dependency array means this only runs once on mount




    if (isAuthenticated) {
        checkUserData();
        return (
            <>

                <StyledDiv>
                    <h1>Upcoming Gifts</h1>
                    <h2>Test header with user: {loggedInUser.username}</h2>
                    <ul>
                        {birthdayData.map((event, index) => (
                            <StyledLI key={index}>🎁  {event.name} - {event.birthdate}</StyledLI>
                        ))}
                    </ul>
                    <StyledButton id='add-event-button' onClick={() => setAddPressed(1)}>Add Event</StyledButton>
                </StyledDiv>
                {addPressed === 0 ?
                    <> </>

                    :

                    <NewGift id='add-event'>
                        <StyledHeader> Fill Out Below To Track A New Gift </StyledHeader>
                        <InnerDiv>
                            <label htmlFor="birthday_name">Name of Recipient:</label>
                            <input type="text" id="birthday_name" /> <br />
                        </InnerDiv>
                        <InnerDiv>
                            <label htmlFor="user_id">User ID:</label>
                            <input type="text" id="id" /> <br />
                        </InnerDiv>
                        <InnerDiv>
                            <label htmlFor="birthdate">Birthdate/Date of Event:</label>
                            <input type="date" id="birthdate" name="birthdate" /> <br />
                        </InnerDiv>
                        <InnerDiv>
                            <label htmlFor="relationship">Relationship:</label> <br />
                            <input type="radio" id="family" name="relationship" value="family" />
                            <label htmlFor="family">Family</label><br />
                            <input type="radio" id="friend" name="relationship" value="friend" />
                            <label htmlFor="family">Friend</label><br />
                            <input type="radio" id="coworker" name="relationship" value="coworker" />
                            <label htmlFor="family">Coworker</label><br />
                            <input type="radio" id="other" name="relationship" value="other" />
                            <label htmlFor="other">Other</label><br />
                        </InnerDiv>
                        <StyledButton type="submit" onClick={submitEvent}>Submit</StyledButton>

                    </NewGift>
                }


            </>
        )
    } else {
        return (
            <StyledDiv>
                <h2>Maybe you should login if you want to see this page</h2>
                <img src='https://ftw.usatoday.com/wp-content/uploads/sites/90/2017/05/spongebob.jpg?w=1000&h=600&crop=1' alt='spongebob' width={400} />
            </StyledDiv>
        )
    }


}


export default Homepage
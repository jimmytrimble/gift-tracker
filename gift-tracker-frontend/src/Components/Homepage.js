// Inital login page
import React, { useState, useEffect, useContext } from 'react';
import { css, styled } from 'styled-components';
import LoginForm from './LoginForm';
import { useAuth0 } from '@auth0/auth0-react';
import Calendar from "./Calendar";
import { UserLog } from '../UserLog';


const StyledDiv = styled.div`
    display: flex;
    flex-flow: column;
    justify-content:center;
    justify-items: center;
    align-content:center;
    align-items: center;
    padding: 10px;
    gap: 10px;
    margin: 20px;
`
const StyledUL = styled.ul`
display: flex;
    flex-flow: column;
    justify-content:center;
    justify-items: center;
    align-content:center;
    align-items: center;
    padding: 10px;
    gap: 10px;
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

const StyledIcon = styled.button`
    display: flex;
    flex-flow: row;
    justify-content: center
    justify-items: center;
    align-content: center;
    align-items: center;
    color: white;
    border-radius: 3px;
    border: 2px solid white;
    background-color: #56c1ab;
`
const StyledHeader = styled.h1`
    display: flex;
    justify-content: center;
    justify-items: center;
    align-content:center;
    align-items: center;
    color:#BF4F74;
    background-color: white;
    width:100%;
`
const StyledTitle = styled.h1`
display: flex;
    justify-content: center;
    justify-items: center;
    align-content:center;
    align-items: center;
    color:#BF4F74;
`
const StyledLI = styled.li`
    display: flex;
    flex-flow:row;
    justify-content:center;
    justify-items: center;
    align-content:center;
    align-items: center;
    list-style-type: none;
    gap: 10px;
    background-color: #f7d9fb;
    color: #2a4be1;
    padding: 20px;
    width: 500px;
    font-weight: bold;
    border: 2px solid white;
`

function Homepage() {
    const { isAuthenticated } = useAuth0();
    const { loggedInUser } = useContext(UserLog);
    const [addPressed, setAddPressed] = useState(0);
    const [birthdayData, setBirthdayData] = useState([]);
    const [isBought, setIsBought] = useState(false);
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
            user_id: loggedInUser.id,
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
            .then(response => {
                console.log(response)
                document.location.reload();
            })

    }

    const loadBirthdays = () => {
        fetch('http://localhost:8081/birthday')
        .then(response => response.json())
        .then(data => {
            const currentDate = new Date();
            let userBirthdates = data.filter(item => item.user_id === loggedInUser.id);
            let sortedBirthdates = userBirthdates.sort((p1, p2) => {
            // if(Date.parse(p1.birthdate) < currentDate || Date.parse(p2.birthdate) < currentDate){
            //     return -1;
            // }
                return (Date.parse(p1.birthdate) - Date.parse(p2.birthdate))
            });
            setBirthdayData(sortedBirthdates.map(item => {
                const splitTime = item.birthdate.split("T");
                const splitDate = splitTime[0].split("-");
                const monthIndex = parseInt(splitDate[1]) - 1;
                splitDate[1] = months[monthIndex];
                item.birthdate = `${splitDate[1]} ${splitDate[2]}`;
                return item
            }))
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }


    useEffect(() => {
        if(isAuthenticated){
            loadBirthdays();
        }
    }, [loggedInUser]);


    const boughtItem = (eventid, e) => {
        const clicked = document.getElementById(e);
        console.log("clicked", e)
        console.log("id", eventid)
        setIsBought(!isBought);

        fetch(`http://localhost:8081/update/${eventid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bought : !isBought})
        })
        clicked.innerHTML = "✅"
    }

    const removeEvent = (eventid, eventName) => {
        const clicked = document.getElementById(eventid);
        fetch(`http://localhost:8081/remove/event/${eventName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) clicked.parentNode.removeChild(clicked);
                else console.error(`Failed to remove event ${eventid}`);
            })
            .catch(error => {
                console.error('Error removing event:', error);
            });
    }

    if (Object.keys(loggedInUser).length !== 0) {
        return (
            <>
                <StyledHeader>YOUR UPCOMING GIFTS!</StyledHeader>
                <StyledDiv>
                    <StyledUL>
                        {birthdayData.map((event, index) => (
                            <StyledLI id={index}>
                             {event.birthdate} for {event.name}
                             {event.bought ?
                                <StyledIcon id={event.name} onClick ={ () => boughtItem(event.id, event.name)}>✅</StyledIcon>
                                :<StyledIcon id={event.name} onClick ={ () => boughtItem(event.id, event.name)}>Done?</StyledIcon>}

                            <span onClick={ () => removeEvent(index, event.name)}>🗑️</span>
                            </StyledLI>
                        ))}
                    </StyledUL>
                    <StyledButton id='add-event-button' onClick={() => setAddPressed(1)}>Add Event</StyledButton>
                </StyledDiv>
                {addPressed === 0 ?
                    <> </>

                    :

                    <NewGift id='add-event'>
                        <StyledTitle> Fill Out Below To Track A New Gift </StyledTitle>
                        <InnerDiv>
                            <label htmlFor="birthday_name">Name of Recipient:</label>
                            <input type="text" id="birthday_name" /> <br />
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
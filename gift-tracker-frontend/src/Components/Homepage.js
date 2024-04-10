// Inital login page
import React, { useState, useEffect } from 'react';
import { css, styled } from 'styled-components';
import LoginForm from './LoginForm';
import { useAuth0 } from '@auth0/auth0-react';
import Calendar from "./Calendar";

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

const InnerDiv = styled.div`
    display: flex;
    justify-content:center;
    align-content:center;
`

const StyledButton = styled.button`
    display: flex;
    justify-content:center;
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

function Homepage() {
    const { isAuthenticated } = useAuth0();
    const [addPressed, setAddPressed] = useState(0);


    /*let userLogin = [
        { userName: 'Noel', password: Working1 },
        { userName: 'Nikki', password: Working2 },
        { userName: 'Will', password: Working3 }
    ];*/

    // const [userName, setUserName] = useState('')
    // const [password, setPassword] = useState('')

    // function infoValidation(userName, password) {
    //     if (userName === userLogin.userName && password === userLogin.password)
    //         return ('Profile page')
    //     else {
    //         return (
    //             console.log('The username or password entered is not correct. please try again.')
    //         )
    //     }
    // }

    const submitEvent = () => {
        let eventName = document.getElementById("birthday_name").value;
        let date = document.getElementById("birthdate").value;
        let familyRelationship = document.getElementById("family").checked;
        let friendRelationship = document.getElementById("friend").checked;
        let coworkerRelationship = document.getElementById("coworker").checked;
        let otherRelationship = document.getElementById("other").checked;

        let relationship = 'other';

        if (familyRelationship) {
            relationship = 'family';
        } else if (friendRelationship) {
            relationship = 'friend';
        } else if (coworkerRelationship) {
            relationship = 'coworker';
        }

        console.log(`eventName: ${eventName}, date: ${date}, relationship: ${relationship}`)

    }

    if (isAuthenticated) {
        return (
            <>
                {addPressed === 0 ?
                    <StyledButton id='add-event-button' onClick={() => setAddPressed(1)}>Add Event</StyledButton>

                    :

                    <StyledDiv id='add-event'>
                        <StyledHeader> Fill Out The Information Below To Track A New Gift </StyledHeader>
                        <InnerDiv>
                            <label htmlfor="birthday_name">Name of Recipient:</label>
                            <input type="text" id="birthday_name" /> <br />
                        </InnerDiv>
                        <InnerDiv>
                            <label htmlfor="birthdate">Birthdate/Date of Event:</label>
                            <input type="date" id="birthdate" name="birthdate" /> <br />
                        </InnerDiv>
                        <InnerDiv>
                            <label htmlfor="relationship">Relationship:</label> <br />
                            <input type="radio" id="family" name="relationship" value="family" />
                            <label htmlfor="family">Family</label><br />
                            <input type="radio" id="friend" name="relationship" value="friend" />
                            <label htmlfor="family">Friend</label><br />
                            <input type="radio" id="coworker" name="relationship" value="coworker" />
                            <label htmlfor="family">Coworker</label><br />
                            <input type="radio" id="other" name="relationship" value="other" />
                            <label htmlfor="other">Other</label><br />
                        </InnerDiv>
                        <StyledButton type="submit" onClick={submitEvent}>Submit</StyledButton>

                    </StyledDiv>
                }


                <div>
                    {/* <LoginForm /> */}
                    <Calendar />
                </div>
            </>
        )
    } else {
        return (
            <>
                <h2>Maybe you should login if you want to see this page</h2>
                <img src='https://ftw.usatoday.com/wp-content/uploads/sites/90/2017/05/spongebob.jpg?w=1000&h=600&crop=1' alt='spongebob' />
            </>
        )
    }


}


export default Homepage
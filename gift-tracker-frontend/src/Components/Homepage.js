// Inital login page
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import LoginForm from 'LoginForm';


let userLogin = [
    {userName: 'Noel', password: Working1},
    {userName: 'Nikki', password: Working2},
    {userName: 'Will', password: Working3}
]

export default function login(){

const [userName, setUserName] = useState('')
const [password, setPassword] = useState('')

    function infoValidation(userName, password){
        if(userName === userLogin.userName && password === userLogin.password)
        return ('Profile page')
        else{
           return(
            console.log('The username or password entered is not correct. please try again.')
           )
        }
    }

    return(

        <div>
            <LoginForm />
        </div>

    );

}
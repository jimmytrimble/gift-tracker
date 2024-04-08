import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Input_box = styled.div`
    display: flex;
    flex-wrap: wrap;
`


const LoginForm  = () => {

    return (

        <div className= 'Wrapper'>
            <form action="">
                <h1>Login</h1>
                <div className="Input_box">
                    <input type="text" placeholder='Username' required />
                </div>
                <div className="Input_box">
                    <input type="password" placeholder='Password' required />
                </div>
                <button type="submit">Login</button>

            </form>
        </div>
    )
}
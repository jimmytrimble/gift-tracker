import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  width: 420px;
  background: slateblue;
  color: #fff;
  border-radius: 10px;
  padding: 30px 40px;
`
const Title = styled.h1`
  font-size: 36px;
  text-align: center;
`
const InputBox = styled.div`
  position: relative;
  width: 100%;
  height: 50px; // Corrected typo from "hignt" to "height"
  background: salmon;
  margin: 30px 0;
`
const Input = styled.input`
  width: 25%;
  height: 10%;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, .2);
  outline: none;
  border-radius: 40px;
  color: #fff;
  padding: 20px 45px 20px 20px;
  &::placeholder {
    color: #fff;
  }
`
const SubmitButton = styled.button`
  width: 100%;
  height: 45px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-weight: 700;
`


const LoginForm  = () => {

    return (

        <Wrapper>
            <form>
                <Title>Enter Recipient info</Title>
                <InputBox>
                    Name:
                    <Input type="text" placeholder='Username' required />
                </InputBox>
                <InputBox>
                    Birthdate_____:
                    <Input type="date" placeholder='mm/dd/yyy' required />
                </InputBox>
                <SubmitButton type="submit">Save</SubmitButton>

            </form>
        </Wrapper>
    )
}

export default LoginForm
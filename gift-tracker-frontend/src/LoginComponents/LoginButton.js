import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components'

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

const StyledButton = styled.button`
    justify-content: center
    justify-items: center;
    align-content: center;
    align-items: center;
    color: white;
    border-radius: 3px;
    border: 2px solid white;
    background-color: #56c1ab;
    margin: 2px;
    padding: 5px;
    width: 100px;
    height: 50px;
    font-size: large
`

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <StyledDiv>
      <StyledButton onClick={() => loginWithRedirect()}>Sign In</StyledButton>
      </StyledDiv>
    )
  );
}

export default LoginButton;

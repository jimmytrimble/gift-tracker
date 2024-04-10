import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const StyledButton = styled.button`
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
    margin: 2px;
    padding: 5px;
    width: 75px;
    height: 30px;
    left-margin: 30px;
`

const Logout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:right;
  gap: 10px;
  margin: 10px;
`

const Username = styled.p`
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row;
  justify-content: center
  justify-items: center;
  align-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`


function LogoutButton() {
  const { user, logout, isAuthenticated } = useAuth0();

  function renderUsername() {
    if (user.name) {
      return <Username> Welcome, {user.name}</Username>
    } else if (user.nickname) {
      return <Username> Welcome, {user.nickname}</Username>
    } else {
      return <Username> Welcome, user without a name</Username>
    }
  }

  return (
    isAuthenticated && (
      <Logout>
        {
          renderUsername()
        }
        <StyledButton onClick={() => logout()}>Sign Out</StyledButton>
      </Logout>
    )
  );
}

export default LogoutButton;
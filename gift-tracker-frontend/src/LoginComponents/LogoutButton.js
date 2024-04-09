import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

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
        <button onClick={() => logout()}>Sign Out</button>
      </Logout>
    )
  );
}

export default LogoutButton;
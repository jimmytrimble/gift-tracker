// Showing the calendar view with birthdays saved
// showing the user bio with their budget

import { useAuth0 } from '@auth0/auth0-react';
import styled from "styled-components";

const ProfileLayout = styled.div`
  display: flex;
  align-items: center;
  jsutify-content: left;
  gap: 10px;
`

const Username = styled.p`

`

function Profile() {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <ProfileLayout>
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.namename}</h2>
        <ul>
          {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
        </ul>
      </ProfileLayout>
    )
  )
}

export default Profile
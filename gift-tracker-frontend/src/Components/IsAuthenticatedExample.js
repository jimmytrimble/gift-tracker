import { useAuth0 } from '@auth0/auth0-react';

function IsAuthenticatedExample() {
  const { user, isAuthenticated } = useAuth0();



  return (
    isAuthenticated && (
      <>

      </>
    )

  );
}
export default IsAuthenticatedExample
//Navigation Menu should have buttons routing to the following pages
// - Profile, - Social, - Wishlist, - Gift Finder

import { Link, useMatch, useResolvedPath } from "react-router-dom"
import styled from 'styled-components';





 const Nav = styled.nav`
    background-color: #333;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 2rem;
    padding: 0 1rem;
    `

 const SiteTitle = styled(Link)`
 color: inherit;
 text-decoration: none;
 font-size: 2rem;
`

const NavUL = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    gap: 1rem;
`


const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  padding: .25rem;
`;



const ListItem = styled.li`
  background-color: ${props => props.isActive ? '#555' : 'transparent'};
  &:hover {
    background-color: #777;
  }
`;

export default function NavMenu() {
  return (
    <Nav>
      <SiteTitle to="/">
        Gift Tracker
      </SiteTitle>
      <NavUL>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/profile">Profile</CustomLink>
        <CustomLink to="/wishlist">Wishlist</CustomLink>
        <CustomLink to="/social">Social</CustomLink>
        <CustomLink to="/giftfinder">Gift Finder</CustomLink>
      </NavUL>
    </Nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <ListItem isactive={isActive}>
      <NavLink to={to} {...props}>
        {children}
      </NavLink>
    </ListItem>
  )
}
//Navigation Menu should have buttons routing to the following pages
// - Profile, - Social, - Wishlist, - Gift Finder
import React, { useState } from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import styled from 'styled-components';





 const Nav = styled.nav`
    background-color: #BF4F74;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 2rem;
    padding: 0 1rem;
    border: 2px solid white;
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
    align-items: center;
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

const BudgetInput = styled.input`
  margin-right: 1rem;
`;
const BudgetButton = styled.button`
  color: white;
  background-color: #444; /* Button color */
  border: none;
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
`;

export default function NavMenu() {
const [budget, setBudget] = useState(0);
const [budgetInput, setBudgetInput] = useState("");

const handleBudgetChange = (e) => {
  setBudgetInput(e.target.value);
};

const updateBudget = () => {
  setBudget(budgetInput);
};


  return (
    <Nav>
      <SiteTitle to="/">
        GIFT TRACKER
      </SiteTitle>
      <NavUL>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/profile">Profile</CustomLink>
        <CustomLink to="/wishlist">Wishlist</CustomLink>
        <CustomLink to="/social">Social</CustomLink>
        <CustomLink to="/giftfinder">Gift Finder</CustomLink>
        <li>
          <BudgetInput
            type="number"
            value={budgetInput}
            onChange={handleBudgetChange}
            placeholder="Set Budget"
          />
          <BudgetButton onClick={updateBudget}>Update Budget</BudgetButton>
        </li>
        <li>Budget: ${budget}</li>
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
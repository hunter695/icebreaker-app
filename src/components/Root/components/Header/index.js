import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const logo = require('./logo.png')

const Logo = styled.img`
  display: flex;
  margin: auto;
  padding-bottom: 30px;
`

const StyledHeader = styled.header`
  color: white;
`

const Navigation = styled.nav`
  display: flex;
  justify-content: flex-end;
  margin: 40px;
  a {
    color: white;
    text-decoration: none;
    font-size: 1.2em;
    margin: 0 8px;
  }
`

const activeStyle = {
  borderBottom: '2px solid white',
}

const Header = () => (
  <StyledHeader>
    <Navigation>
      <NavLink exact activeStyle={activeStyle} to="/">Home</NavLink>
      <NavLink activeStyle={activeStyle} to="/Contribute">Contribute</NavLink>
      <NavLink activeStyle={activeStyle} to="/About">About</NavLink>
    </Navigation>
    <Logo src={logo} />
  </StyledHeader>
)

export default Header

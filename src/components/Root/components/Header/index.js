import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  color: white;
`

const Navigation = styled.nav`
  ul {
    list-style-type: none;
    display: flex;
    justify-content: flex-end;
    margin: 40px;
    li {
      margin: 0 8px;
    }
  }
`

const AppTitle = styled.h1`
  text-align: center;
  font-size: 4em;
  letter-spacing: 4px;
`

const Header = () => (
  <StyledHeader>
    <Navigation>
      <ul>
        <li>Home</li>
        <li>Contribute</li>
        <li>About</li>
      </ul>
    </Navigation>
    <AppTitle>icebreaker</AppTitle>
  </StyledHeader>
)

export default Header

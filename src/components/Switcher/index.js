import React, { PropTypes } from 'react'
import styled from 'styled-components'
import Toggle from 'components/Toggle'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  :nth-child(2) {
    margin: 0 8px;
  }
`

const Highlight = styled.span`
  color: #fff;
`

const Dim = styled.span`
  color: black;
  opacity: 0.2;
`

const Switcher = ({ checked, choices, name, onChange }) => (
  <Wrapper>
    {checked ? <Dim>{choices[0]}</Dim> : <Highlight>{choices[0]}</Highlight> }
    <Toggle name={name} onChange={onChange} />
    {checked ? <Highlight>{choices[1]}</Highlight> : <Dim>{choices[1]}</Dim> }
  </Wrapper>
)

Switcher.propTypes = {
  checked: PropTypes.bool.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Switcher

import React, { PropTypes } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  font-size: 1.4em;
  padding: 0.6em;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  color: #eee;
  &::placeholder {
    color: #eee;
  }
  &:focus {
    border-bottom: 2px solid #09c;
  }
`

const AndroidInput = (props) => (
  <Input onChange={props.onChange} />
)

AndroidInput.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default AndroidInput

import React, { PropTypes } from 'react'
import styled from 'styled-components'

const ToggleButton = styled.div`
  > input {
    display: none;
  }
  > input:checked + label {
    background: #6fbeb5;
    &::after {
      left: 20px;
      background: #179588;
    }
  }
  > label {
    position: relative;
    display: block;
    height: 20px;
    width: 44px;
    background: #aac862;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.3s ease;
    &::after {
      position: absolute;
      left: -2px;
      top: -3px;
      display: block;
      width: 26px;
      height: 26px;
      border-radius: 100px;
      background: #649e7e;
      content: '';
      transition: all 0.3s ease;
    }
    &:active {
      &::after {
        transform: scale(1.15, 0.85);
      }
    }
  }
`

const Toggle = (props) => (
  <ToggleButton>
    <input type="checkbox" id={props.name} onChange={props.onChange} />
    <label htmlFor={props.name} />
  </ToggleButton>
)

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Toggle

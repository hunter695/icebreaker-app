import styled from 'styled-components'

const button = styled.button`
  background-color: #fcba25;
  cursor: pointer;
  border: none;
  max-height: 60px;
  padding: 0 16px;
  border-radius: 7px;
  font-family: "Arial", "Helvetica", sans-serif;
  font-size: 21px;
  font-weight: bold;
  color: white;
  box-shadow: 0 9px #999;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #ffc33d;
  }
  &:active {
    background-color: #fcba25;
    box-shadow: 0 4px #666;
    transform: translateY(5px);
  }
`

export default button

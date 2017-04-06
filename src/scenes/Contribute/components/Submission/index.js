import React, { PropTypes } from 'react'
import styled from 'styled-components'
import AndroidInput from 'components/AndroidInput'
import Button from 'components/Button'

const Wrapper = styled.div`
  display: flex;
  width: 75%;
  > * {
    margin: 0 16px;
  }
`

const Submission = (props) => (
  <Wrapper>
    <AndroidInput
      placeholder={`Enter your ${props.type}`}
      onChange={props.onChange}
    />
    <Button onClick={props.onClick}>Submit</Button>
  </Wrapper>
)

Submission.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['icebreaker', 'pickup']).isRequired,
}

export default Submission

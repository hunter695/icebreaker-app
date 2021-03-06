import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Switcher from 'components/Switcher'
import Submission from './components/Submission'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  :first-child {
    margin-bottom: 32px;
  }
`

export default class Contribute extends Component {
  state = {
    type: 'icebreaker',
    text: '',
  }

  switchType = () => {
    const type = this.state.type === 'icebreaker' ? 'pickup' : 'icebreaker'
    this.setState({
      type,
    })
  }

  updateText = (event) => {
    const text = event.target.value
    this.setState({
      text,
    })
  }

  clearText = () => {
    this.setState({
      text: '',
    })
  }

  submitContribution = () => {
    const text = this.state.text
    axios.post(`/${this.state.type}`,
      { text, author: 'Anonymous' })
    this.clearText()
  }

  render() {
    return (
      <Main>
        <Switcher
          name="contribution"
          choices={['icebreaker', 'pickup']}
          checked={this.state.type === 'pickup'}
          onChange={this.switchType}
        />
        <Submission
          type={this.state.type}
          text={this.state.text}
          onClick={this.submitContribution}
          onChange={this.updateText}
        />
      </Main>
    )
  }
}

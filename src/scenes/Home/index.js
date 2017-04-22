import React, { Component } from 'react'
import axios from 'axios'
import Switcher from 'components/Switcher'
import styled from 'styled-components'
import Button from 'components/Button'
import LineDisplayCard from './components/LineDisplayCard'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  > button {
    width: 160px;
    padding: 16px 0;
    align-self: center;
    margin-top: 30px;
  }
`

const Controls = styled.div`
  display: flex;
  justify-content: space-around;
`

export default class Home extends Component {
  state = {
    type: 'icebreaker',
    wild: false,
    data: null,
  }

  getLine = (wild) => (
    axios.get(`/${this.state.type}?wild=${wild}`)
      .then((response) => response.data)
  )

  switchType = () => {
    const type = this.state.type === 'icebreaker' ? 'pickup' : 'icebreaker'
    this.setState({
      type,
    })
  }

  switchSafety = () => {
    const wild = !this.state.wild
    this.setState({
      wild,
    })
  }

  renderData = () => {
    const wild = this.state.wild
    const result = this.getLine(wild)
    result.then((data) => {
      this.setState({
        data,
      })
    })
  }

  render() {
    return (
      <Main>
        <Controls>
          <Switcher
            name="homeTypePicker"
            choices={['icebreaker', 'pickup']}
            checked={this.state.type === 'pickup'}
            onChange={this.switchType}
          />
          <Switcher
            name="homeSafetyPicker"
            choices={['safe', 'wildcard']}
            checked={this.state.wild}
            onChange={this.switchSafety}
          />
        </Controls>
        <Button
          onClick={this.renderData}
        >
          Break the Ice!
        </Button>
        <LineDisplayCard data={this.state.data} />
      </Main>
    )
  }
}

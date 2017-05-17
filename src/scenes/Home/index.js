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
    renderButton: true,
    data: null,
  }
  onClickLike = (val) => () => {
    const { collection, _id } = this.state.data
    axios.post('/like',
      { collection, id: _id, amount: val })
      .then(() => this.updateLikes(val))
    const date = new Date()
    localStorage.setItem('voteTime', (date.getTime() / 1000))
    this.setState({
      renderButton: false,
    })
  }

  getLine = (wild) => (
    axios.get(`/${this.state.type}?wild=${wild}`)
      .then((response) => response.data)
  )

  updateLikes = (val) => {
    const data = this.state.data

    if (val < 0) {
      data.dislikes += 1
    } else {
      data.likes += 1
    }
    this.setState({
      data,
    })
  }

  switchType = () => {
    const type = this.state.type === 'icebreaker' ? 'pickup' : 'icebreaker'
    this.setState({
      type,
    })
  }

  switchSafety = () => {
    const wild = !this.state.wild
    const data = this.data
    this.setState({
      wild, data,
    })
  }

  renderData = () => {
    const voteTime = parseFloat(localStorage.voteTime)
    const date = new Date()
    let renderButton = true
    if (voteTime && ((date.getTime() / 1000) - voteTime) < 30) {
      renderButton = false
    }
    const wild = this.state.wild
    const result = this.getLine(wild)
    result.then((data) => {
      this.setState({
        data, renderButton,
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
        <LineDisplayCard renderButton={this.state.renderButton} isWild={this.state.wild} data={this.state.data} onClickLike={this.onClickLike} />
      </Main>
    )
  }
}

import React, { PropTypes } from 'react'
import styled from 'styled-components'
import 'normalize.css'
import Header from './components/Header'
import Footer from './components/Footer'

const MaxHeight = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Content = styled.main`
  flex: 1;
`

const Root = (props) => (
  <MaxHeight>
    <Header />
    <Content>{props.children}</Content>
    <Footer />
  </MaxHeight>
)

Root.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Root

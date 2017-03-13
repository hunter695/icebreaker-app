import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from 'components/Root'
import Home from 'scenes/Home'

const rootEl = document.getElementById('root')
const render = (Component) =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <AppContainer>
      <Root>
        <Component />
      </Root>
    </AppContainer>,
    rootEl
  )

render(Home)
if (module.hot) module.hot.accept(() => render(Home))

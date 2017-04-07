import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Root from 'components/Root'
import Home from 'scenes/Home'
import Contribute from 'scenes/Contribute'
import About from 'scenes/About'

const App = () => (
  <Router>
    <Root>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/contribute" component={Contribute} />
        <Route exact path="/about" component={About} />
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </Root>
  </Router>
)

export default App

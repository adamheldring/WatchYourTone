import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Header from "./header/header"
import StartPage from "./pages/startPage/startPage"
import NotFound from "./pages/404/404"

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }

}

export default App

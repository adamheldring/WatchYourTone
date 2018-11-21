import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Header from "./header/header"
import ComposerPage from "./pages/composerPage/composerPage"
// import Settings from "./amodules/settings/settings"
import SaveLoad from "./amodules/saveLoad/saveLoad"
import NotFound from "./pages/404/404"

class App extends React.Component {

  // REMOVED ROUTING ALTERNATIVES AND TURNED THESE PAGES INTO MODULS OF COMPOSER PAGE
  // <Route exact path="/settings/" component={Settings} />
  // <Route exact path="/saveload/" component={SaveLoad} />

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={ComposerPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }

}

export default App

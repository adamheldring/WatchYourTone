import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Header from "./header/header"
import ComposerPage from "./pages/composerPage/composerPage"
import SettingsPage from "./pages/settingsPage/settingsPage"
import SaveLoadPage from "./pages/saveLoadPage/saveLoadPage"
import NotFound from "./pages/404/404"

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={ComposerPage} />
            <Route exact path="/settings/" component={SettingsPage} />
            <Route exact path="/saveload/" component={SaveLoadPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }

}

export default App

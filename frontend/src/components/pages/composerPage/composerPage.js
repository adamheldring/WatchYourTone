import React from "react"
import Sequenser from "../../amodules/sequenser/sequenser"
import SaveLoad from "../../amodules/saveLoad/saveLoad"

import "./composerPage.scss"

class ComposerPage extends React.Component {

state = {
  newSongLoaded: false
}

loadNewSong = newSongLoaded => {
  this.setState({ newSongLoaded })
}

resetSongLoader = () => {
  this.setState({ newSongLoaded: false })
}

render() {
  return (
    <div className="page-wrapper page-wrapper--composerPage">
      <Sequenser
        newSongLoaded={this.state.newSongLoaded}
        resetSongLoader={this.resetSongLoader} />
      <SaveLoad loadNewSong={newSongLoaded => this.loadNewSong(newSongLoaded)} />
    </div>
  )
}

}

export default ComposerPage

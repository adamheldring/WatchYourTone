import React from "react"
import Header from "../../header/header"
import Sequenser from "../../amodules/sequenser/sequenser"
import SaveLoad from "../../amodules/saveLoad/saveLoad"

import "./composerPage.scss"

class ComposerPage extends React.Component {

state = {
  newSongLoaded: false,
  bpmChanged: false
}

loadNewSong = newSongLoaded => {
  console.log("New song just loaded to SessionStorage...")
  this.setState({ newSongLoaded })
}

resetSongLoader = () => {
  console.log("New song loaded to sequenser, loader reset...")
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

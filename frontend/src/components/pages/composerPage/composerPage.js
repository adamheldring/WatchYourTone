import React from "react"
import Sequenser from "../../sequenser/sequenser"
import "./composerPage.scss"


class ComposerPage extends React.Component {

  render() {
    return (
      <div className="page-wrapper page-wrapper--composerPage">
        <h1 className="composerPage-headline">COMPOSE</h1>
        <Sequenser />
      </div>
    )
  }

}

export default ComposerPage

import React from "react"

class Settings extends React.Component {

state = {
  bpm: 140
}

handleBpmChange = e => {
  this.setState({
    bpm: e.target.value
  }, () => {
    sessionStorage.setItem("bpm", this.state.bpm)
    console.log("STORAGE bpm: ", sessionStorage.getItem("bpm"))
    this.props.bpmChanged(true)
  })
}

render() {
  const { bpm } = this.state
  return (
    <div className="page-wrapper page-wrapper--settingsPage">
      <h2 className="composerPage-headline">SOUND SETTINGS</h2>
      <div className="meters">
        <input
          name="bpm"
          type="range"
          min="40"
          max="300"
          value={bpm}
          onChange={this.handleBpmChange} />
        <label htmlFor="bpm">{bpm} BPM</label>
      </div>

  </div>
  )
}

}

export default Settings

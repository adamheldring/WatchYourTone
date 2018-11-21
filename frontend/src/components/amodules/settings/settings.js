import React from "react"

class Settings extends React.Component {

  handleBpmChange = e => {
    this.props.changeBpm(e.target.value)
    console.log("SETTINGS PAGE SAYING NEW BPM: ", e.target.value)
  }

  handleWaveChange = e => {
    this.props.changeWaveForm(e.target.value)
    console.log("SETTINGS PAGE SAYING NEW WF: ", e.target.value)
  }

  render() {
    const { bpm, synthWaveForm } = this.props
    return (
      <section className="settings-container">
        <h3 className="section-heading">SETTINGS</h3>
        <div className="meters">
          <input
            name="bpm"
            type="range"
            min="40"
            max="300"
            value={bpm}
            onChange={this.handleBpmChange} />
          <label htmlFor="bpm">{this.props.bpm} BPM</label>
        </div>

        <div className="waveFormSetting-container">
          <label className="radio-button-container" htmlFor="triangle">
            Triangle
            <input
              type="radio"
              id="triangle"
              name="triangle"
              value="triangle"
              onChange={this.handleWaveChange}
              checked={synthWaveForm === "triangle"} />
            <span className="custom-radio-button" />
          </label>
          <br />
          <label className="radio-button-container" htmlFor="square">
            Square
            <input
              type="radio"
              id="square"
              name="square"
              value="square"
              onChange={this.handleWaveChange}
              checked={synthWaveForm === "square"} />
            <span className="custom-radio-button" />
          </label>
          <br />
          <label className="radio-button-container" htmlFor="sawtooth">
            Sawtooth
            <input
              type="radio"
              id="sawtooth"
              name="sawtooth"
              value="sawtooth"
              onChange={this.handleWaveChange}
              checked={synthWaveForm === "sawtooth"} />
            <span className="custom-radio-button" />
          </label>
          <br />
          <label className="radio-button-container" htmlFor="sine">
            Sine
            <input
              type="radio"
              id="sine"
              name="sine"
              value="sine"
              onChange={this.handleWaveChange}
              checked={synthWaveForm === "sine"} />
            <span className="custom-radio-button" />
          </label>
          <br />

        </div>
      </section>
    )
  }

}

export default Settings

import React from "react"
import "./settings.scss"
import "./customRadioButtons.scss"
import "./customRangeInput.scss"

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
    const { bpm, synthWaveForm, loadedSongTitle, loadedSongComposer } = this.props
    return (
      <section className="settings-container">
        <h2 className="composerPage-headline">SETTINGS</h2>
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
            <img src="./assets/wf-triangle-small.png" className="waveform-image" alt="triangle-waveform" />
            {" "}Triangle
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
            <img src="./assets/wf-square-small.png" className="waveform-image" alt="square-waveform" />
            {" "}Square
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
            <img src="./assets/wf-sawtooth-small.png" className="waveform-image" alt="sawtooth-waveform" />
            {" "}Sawtooth
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
            <img src="./assets/wf-sine-small.png" className="waveform-image" alt="sine-waveform" />
            {" "}Sine
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
        <div className="songDetails-container">
          <h2 className="songDetails">{`"${loadedSongTitle}"`}</h2>
          <h3 className="songDetails">BY {loadedSongComposer}</h3>
        </div>
      </section>
    )
  }

}

export default Settings

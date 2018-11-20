import React from "react"
import Tone from "tone"
import SeqDrum from "./seqDrum"
import SynthKey from "./synthKey"
import "./sequenser.scss"

class Sequenser extends React.Component {

state = {
  synth: [
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  ],
  drums: [
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  ],
  activeBar: 0,
  resetTransport: false,
  bpm: 140,
  synthWaveForm: "triangle"
}

componentDidMount() {
  Tone.Transport.cancel()
  this.soundGenerator()
  this.checkForActiveSession()
}

componentDidUpdate(prevProps, prevState) {
  if (this.props.newSongLoaded) {
    this.checkForActiveSession()
    this.props.resetSongLoader()
  }

  if (this.state !== prevState) {
    sessionStorage.setItem("drums", JSON.stringify(this.state.drums))
    sessionStorage.setItem("synth", JSON.stringify(this.state.synth))
  }
}

componentWillUnmount() {
  Tone.Transport.stop()
  sessionStorage.setItem("drums", JSON.stringify(this.state.drums))
  sessionStorage.setItem("synth", JSON.stringify(this.state.synth))
}

checkForActiveSession = () => {
  if (sessionStorage.getItem("drums")) {
    this.setState({
      drums: JSON.parse(sessionStorage.getItem("drums")),
      synth: JSON.parse(sessionStorage.getItem("synth"))
    })
  }
}

startPlaying = () => {
  console.log("PLAYING")
  Tone.Transport.start("+0.2")
  // this.setState({ playing: true })
}

stopPlaying = () => {
  console.log("STOPPED")
  Tone.Transport.stop()
  // this.setState({ playing: false })
}

rewindPlaying = () => {
  console.log("Rewind")
  this.setState({ resetTransport: true, activeBar: 0 })
}

handleDrumClick = (drumIndex, barIndex) => {
  const newDrumMatrix = this.state.drums
  newDrumMatrix[drumIndex][barIndex] = !this.state.drums[drumIndex][barIndex]
  this.setState({
    drums: newDrumMatrix
  }, console.table(this.state.drums))
}

handleNoteClick = (synthKeyIndex, barIndex) => {
  const newSynthMatrix = this.state.synth
  newSynthMatrix[synthKeyIndex][barIndex] = !this.state.synth[synthKeyIndex][barIndex]
  this.setState({
    synth: newSynthMatrix
  }, console.table(this.state.synth))
}

handleBpmChange = e => {
  this.setState({
    bpm: e.target.value
  }, () => {
    console.log("STATE bpm: ", this.state.bpm)
    console.log("TRANSPORT bpm: ", Tone.Transport.bpm.value)
    Tone.Transport.bpm.rampTo(this.state.bpm, 0.2)
  })
}

changeWaveForm = e => {
  console.log(e.target.value)
  this.setState({
    synthWaveForm: e.target.value
  }, () => console.log("STATE waveform: ", this.state.synthWaveForm))
}

clearMatrix = () => {
  console.log("Cleared sequenser...")
  this.setState({
    synth: [
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ],
    drums: [
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ]
  })
  sessionStorage.removeItem("drums")
  sessionStorage.removeItem("synth")

}

soundGenerator = () => {

  // FUTURE REVERBS AND FX SECTION
  const freeverb = new Tone.Freeverb(0.05, 15000).toMaster()
  const gain = new Tone.Gain(0.6)
  gain.connect(freeverb)

  // gain.toMaster()

  // --------------------//
  //    DRUMS SECTION    //
  // --------------------//

  const drums = [
    new Tone.MembraneSynth(),
    new Tone.NoiseSynth({
      noise: {
        type: "white"
      },
      envelope: {
        attack: 0.001,
        decay: 0.15,
        sustain: 0.05,
        release: 0.2
      }
    }),
    new Tone.MetalSynth(
      {
        frequency: 200,
        envelope: {
          attack: 0.001,
          decay: 0.05,
          release: 0.05
        },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      }
    )
  ]

  // OLD SNARE V1
  // new Tone.PluckSynth(
  //   {
  //     attackNoise: 2,
  //     dampening: 4000,
  //     resonance: 0.45
  //   }
  // ),
  // drums[i].triggerAttackRelease("C2", "16n", time)


  drums.forEach(drum => drum.connect(gain))

  drums[0].oscillator.type = "sine"
  // drums[1].oscillator.type = "sawtooth"
  // drums[2].oscillator.type = "sine"

  // --------------------//
  //    SYNTH SECTION    //
  // --------------------//

  const synths = []
  for (let i = 0; i < this.state.synth[0].length; i++) {
    synths.push(new Tone.Synth())
    // synths[i].oscillator.type = "triangle"
  }
  // new Tone.Synth(),
  // new Tone.Synth(),
  // new Tone.Synth(),
  // new Tone.Synth(),
  // new Tone.Synth(),
  // new Tone.Synth(),
  // new Tone.Synth(),
  // new Tone.Synth(),
  console.log("Synths: ", synths)

  synths.forEach(synth => synth.connect(gain))


  // --------------------//
  //      FX SECTION     //
  // --------------------//

  // FUTURE REVERBS AND FX SECTION
  // const freeverb = new Tone.Freeverb(0.02, 15000).toMaster();
  // gain.connect(freeverb)

  // const jcReverb = new Tone.JCReverb(0.02).toMaster();
  // gain.connect(jcReverb)

    // gain.toMaster()

  // -------------------- //
  //  TRANSPORT SECTION   //
  // -------------------- //

  let index = 0

  const drumNotes = ["C1", "C2", "C4"]

  const synthNotes = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"]

  Tone.Transport.bpm.value = this.state.bpm
  Tone.context.latencyHint = "fastest"
  Tone.Transport.scheduleRepeat(time => {
    if (this.state.resetTransport) {
      index = 0
      this.setState({ resetTransport: false, activeBar: 0 })
    }
    let step = index % 16
    this.setState({ activeBar: step })
    for (let i = 0; i < this.state.drums.length; i++) {
      if (this.state.drums[i][step]) {
        switch(i) {
          case 1:
            drums[i].triggerAttackRelease("16n")
            break
          case 2:
            drums[i].triggerAttackRelease("16n", time, 0.6)
            break
          default:
            drums[i].triggerAttackRelease(drumNotes[i], "8n", time)
        }
      }
    // }
    for (let i = 0; i < this.state.synth.length; i++) {
      if (this.state.synth[i][step]) {
          synths[i].oscillator.type = this.state.synthWaveForm
          synths[i].triggerAttackRelease(synthNotes[i], "8n", time)
      }
    }
  }
  index++
}, "8n")

}

render() {
  const { synth, drums, activeBar, bpm, synthWaveForm } = this.state
  return (
    <div className="sequenser-container">
      <h3 className="section-heading">SEQUENSER</h3>
      <div className="synth-container">
        <table>
          <thead>
            <tr>
              {synth[0].map((bars, index) => {
                return <th key={index} className={(index === activeBar) ?
                  "barIndicator barIndicator--active" :
                  "barIndicator"
                }>{index + 1}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {synth.map((synthKey, synthKeyIndex) => {
              return <SynthKey
                key={synthKeyIndex}
                synthKeyIndex={synthKeyIndex}
                bars={synth[synthKeyIndex]}
                synthKeyMatrix={synth}
                handleNoteClick={(barIndex) => this.handleNoteClick(synthKeyIndex, barIndex)}
              />
            })}
            </tbody>
        </table>
      </div>

      <div className="drums-container">
        <table>
          <thead>
            <tr>
              {drums[0].map((bars, index) => {
                return <th key={index} className={(index === activeBar) ?
                  "barIndicator barIndicator--active" :
                  "barIndicator"
                }>{index + 1}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {drums.map((drum, drumIndex) => {
              return <SeqDrum
                key={drumIndex}
                drumIndex={drumIndex}
                bars={drums[drumIndex]}
                drumMatrix={drums}
                handleDrumClick={(barIndex) => this.handleDrumClick(drumIndex, barIndex)}
              />
            })}
            </tbody>
        </table>
      </div>

      <div>
        <button onClick={this.startPlaying}>PLAY &#9654;</button>
        <button onClick={this.stopPlaying}>STOP &#9632;</button>
        <button onClick={this.rewindPlaying}>REWIND &#9664;&#9664;</button>
        <button onClick={this.clearMatrix}>CLEAR</button>
      </div>

      <section className="settings-container">
        <h3 className="section-heading">SETTINGS</h3>
        <div className="meters">
          <input
            name="bpm"
            type="range"
            min="40"
            max="300"
            value={bpm}
            onChange={this.handleBpmChange}
            />
          <label htmlFor="bpm">{this.state.bpm} BPM</label>
        </div>

        <div className="waveFormSetting-container">
          <label className="radio-button-container" htmlFor="triangle">
            Triangle
            <input
              type="radio"
              id="triangle"
              name="triangle"
              value="triangle"
              onChange={this.changeWaveForm}
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
              onChange={this.changeWaveForm}
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
              onChange={this.changeWaveForm}
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
              onChange={this.changeWaveForm}
              checked={synthWaveForm === "sine"} />
            <span className="custom-radio-button" />
          </label>
          <br />

        </div>
      </section>

    </div>
  )
}

}

export default Sequenser

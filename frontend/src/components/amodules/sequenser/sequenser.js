import React from "react"
import Tone from "tone"
import SeqDrum from "./seqDrum"
import SynthKey from "./synthKey"
import Settings from "../settings/settings"
import { EMPTY_SYNTH_MATRIX, EMPTY_DRUM_MATRIX, SNARE_DRUM_SETTINGS, HIHAT_DRUM_SETTINGS, SYNTH_NOTES } from "../../constants"
import "./sequenser.scss"

class Sequenser extends React.Component {

state = {
  synth: EMPTY_SYNTH_MATRIX,
  drums: EMPTY_DRUM_MATRIX,
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
}

stopPlaying = () => {
  console.log("STOPPED")
  Tone.Transport.stop()
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

handleBpmChange = newBpm => {
  this.setState({
    bpm: newBpm
  }, () => {
    console.log("STATE bpm: ", this.state.bpm)
    console.log("TRANSPORT bpm: ", Tone.Transport.bpm.value)
    Tone.Transport.bpm.rampTo(this.state.bpm, 0.2)
  })
}

changeWaveForm = newWaveForm => {
  console.log(newWaveForm)
  this.setState({
    synthWaveForm: newWaveForm
  }, () => console.log("STATE waveform: ", this.state.synthWaveForm))
}

clearMatrix = () => {
  console.log("Cleared sequenser...")
  this.setState({
    synth: EMPTY_SYNTH_MATRIX,
    drums: EMPTY_DRUM_MATRIX
  })
  sessionStorage.removeItem("drums")
  sessionStorage.removeItem("synth")
}

soundGenerator = () => {
  // ---------------------- //
  //   MASTER & FX SECTION  //
  // ---------------------- //

  Tone.Transport.bpm.value = this.state.bpm
  Tone.context.latencyHint = "fastest"

  // SIGNAL CHAIN: Source(Sequenser) -> Gain -> Reverb -> Master(Speakers)
  const freeverb = new Tone.Freeverb(0.05, 15000).toMaster()
  const gain = new Tone.Gain(0.6)
  gain.connect(freeverb)

  // --------------------//
  //    DRUMS SECTION    //
  // --------------------//

  const drums = [
    new Tone.MembraneSynth(),
    new Tone.NoiseSynth(SNARE_DRUM_SETTINGS),
    new Tone.MetalSynth(HIHAT_DRUM_SETTINGS)
  ]
  drums.forEach(drum => drum.connect(gain))

  // --------------------//
  //    SYNTH SECTION    //
  // --------------------//

  const synths = []
  this.state.synth.forEach((synth, i) => (
    synths.push(new Tone.Synth())
  ))
  synths.forEach(synth => synth.connect(gain))

  // -------------------- //
  //  TRANSPORT SECTION   //
  // -------------------- //

  let transportIndex = 0

  // RUN LOOP
  Tone.Transport.scheduleRepeat(time => {
    if (this.state.resetTransport) {
      transportIndex = 0
      this.setState({ resetTransport: false, activeBar: 0 })
    }
    const step = transportIndex % 16
    this.setState({ activeBar: step })

    // UPDATE SYNTH WAVEFORM IF USER SWITCHED SETTING
    if (synths[0].oscillator.type !== this.state.synthWaveForm) {
      const setNewWaveFrom = synths.map(synth => {
        return new Promise(resolve => {
          synth.oscillator.type = this.state.synthWaveForm
          resolve()
        })
      })
      Promise.all(setNewWaveFrom).then(
        console.log("All synths updated to new waveform...")
      )
    }

    // GENERATE USER'S SYNTH NOTES
    synths.forEach((synth, synthIndex) => {
      if (this.state.synth[synthIndex][step]) {
        synth.triggerAttackRelease(SYNTH_NOTES[synthIndex], "8n", time)
      }
    })

    // GENERATE USER'S DRUM BEATS
    drums.forEach((drum, drumIndex) => {
      if (this.state.drums[drumIndex][step]) {
        switch (drumIndex) {
          default:
            drums[drumIndex].triggerAttackRelease("C1", "8n", time); break
          case 1:
            drums[drumIndex].triggerAttackRelease("16n"); break
          case 2:
            drums[drumIndex].triggerAttackRelease("16n", time, 0.6); break
        }
      }
    })

    transportIndex++
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

      // MAKE SETTINGS COMPONENT
      <Settings
        bpm={bpm}
        changeBpm={newBpm => this.handleBpmChange(newBpm)}
        synthWaveForm={synthWaveForm}
        changeWaveForm={newWaveForm => this.changeWaveForm(newWaveForm)} />
      
    </div>
  )
}

}

export default Sequenser

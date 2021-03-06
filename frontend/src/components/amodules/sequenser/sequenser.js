import React from "react"
import Tone from "tone"
import StartAudioContext from "startaudiocontext"
import SynthModule from "./synthModule"
import DrumsModule from "./drumsModule"
import Settings from "../settings/settings"
import { EMPTY_SYNTH_MATRIX, EMPTY_DRUM_MATRIX, SNARE_DRUM_SETTINGS, HIHAT_DRUM_SETTINGS,
  SYNTH_NOTES, DEFAULT_BPM, DEFAULT_WAVEFORM, DEFAULT_SONG_TITLE, DEFAULT_COMPOSER } from "../../constants"
import "./sequenser.scss"

class Sequenser extends React.Component {

state = {
  synth: EMPTY_SYNTH_MATRIX(),
  drums: EMPTY_DRUM_MATRIX(),
  activeBar: 0,
  resetTransport: false,
  bpm: 140,
  synthWaveForm: "triangle",
  loadedSongTitle: DEFAULT_SONG_TITLE,
  loadedSongComposer: DEFAULT_COMPOSER
}

componentDidMount() {
  console.log("* Optimized for Chrome Desktop *")
  console.log("Adam Heldring – an experiment exploring the Web Audio API and Tone.js")
  console.log("wyt@adamheldring.com")
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
    sessionStorage.setItem("bpm", this.state.bpm)
    sessionStorage.setItem("waveform", this.state.synthWaveForm)
    sessionStorage.setItem("loadedSongTitle", this.state.loadedSongTitle)
    sessionStorage.setItem("loadedSongComposer", this.state.loadedSongComposer)
  }
}

componentWillUnmount() {
  Tone.Transport.stop()
}

checkForActiveSession = () => {
  try {
    if (sessionStorage && sessionStorage.getItem("drums")) {
      this.setState({
        drums: JSON.parse(sessionStorage.getItem("drums")),
        synth: JSON.parse(sessionStorage.getItem("synth")),
        bpm: sessionStorage.getItem("bpm"),
        synthWaveForm: sessionStorage.getItem("waveform"),
        loadedSongTitle: sessionStorage.getItem("loadedSongTitle"),
        loadedSongComposer: sessionStorage.getItem("loadedSongComposer"),
      }, () => this.handleBpmChange(this.state.bpm))
    }
  } catch (err) {
    console.log(err)
  }
}

startPlaying = () => {
  StartAudioContext(Tone.context, '#playButton').then(() => {
  	Tone.Transport.start("+0.2")
  })
}

stopPlaying = () => {
  Tone.Transport.stop()
}

rewindPlaying = () => {
  this.setState({ resetTransport: true, activeBar: 0 })
}

handleDrumClick = (drumIndex, barIndex) => {
  const newDrumMatrix = this.state.drums
  newDrumMatrix[drumIndex][barIndex] = !this.state.drums[drumIndex][barIndex]
  this.setState({
    drums: newDrumMatrix
  })
}

handleNoteClick = (synthKeyIndex, barIndex) => {
  const newSynthMatrix = this.state.synth
  newSynthMatrix[synthKeyIndex][barIndex] = !this.state.synth[synthKeyIndex][barIndex]
  this.setState({
    synth: newSynthMatrix
  })
}

handleBpmChange = newBpm => {
  this.setState({
    bpm: newBpm
  }, () => {
    Tone.Transport.bpm.rampTo(this.state.bpm, 0.2)
  })
}

changeWaveForm = newWaveForm => {
  this.setState({
    synthWaveForm: newWaveForm
  })
}

clearMatrix = () => {
  this.setState({
    synth: EMPTY_SYNTH_MATRIX(),
    drums: EMPTY_DRUM_MATRIX(),
    bpm: DEFAULT_BPM,
    synthWaveForm: DEFAULT_WAVEFORM,
    loadedSongTitle: DEFAULT_SONG_TITLE,
    loadedSongComposer: DEFAULT_COMPOSER
  }, () => this.handleBpmChange(this.state.bpm))
  sessionStorage.removeItem("drums")
  sessionStorage.removeItem("synth")
  sessionStorage.removeItem("bpm")
  sessionStorage.removeItem("waveform")
  sessionStorage.removeItem("loadedSongTitle")
  sessionStorage.removeItem("loadedSongComposer")
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
      const setNewWaveForm = synths.map(synth => {
        return new Promise(resolve => {
          synth.oscillator.type = this.state.synthWaveForm
          resolve()
        })
      })
      Promise.all(setNewWaveForm).then(
        // console.log("All synths updated to new waveform...")
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

  const { synth, drums, activeBar, bpm, synthWaveForm, loadedSongTitle, loadedSongComposer } = this.state
  return (

    <div className="musicMaker-wrapper">
      <section className="sequenser-container">
        <h1 className="composerPage-headline">COMPOSE</h1>
        {this.state.loadedSongTitle !== "untitled" ?
          <h3 className="section-heading">
            {"SONG:"} <span className="highlighted">{`"${loadedSongTitle.toUpperCase()}" `}</span>
            {" "}
            {"BY:"} <span className="highlighted">{loadedSongComposer.toUpperCase()}</span>
        </h3> : <h3 className="section-heading"><span className="highlighted">NEW SONG</span></h3>

        }

        <SynthModule
          synth={synth}
          activeBar={activeBar}
          handleNoteClick={(synthKeyIndex, barIndex) => this.handleNoteClick(synthKeyIndex, barIndex)} />

        <DrumsModule
          drums={drums}
          activeBar={activeBar}
          handleDrumClick={(drumIndex, barIndex) => this.handleDrumClick(drumIndex, barIndex)}
          />

        <div className="transportControls">
          <button onClick={this.startPlaying} className="transportControl transportControl__button" id="playButton"><span className="transportControl__symbol"><i className="fas fa-play"></i></span><br />PLAY</button>
          <button onClick={this.stopPlaying} className="transportControl transportControl__button"><span className="transportControl__symbol transportControl__symbol--stop"><i className="fas fa-stop"></i></span><br />STOP</button>
          <button onClick={this.rewindPlaying} className="transportControl transportControl__button"><span className="transportControl__symbol"><i className="fas fa-backward"></i></span><br />REWIND</button>
          <button onClick={this.clearMatrix} className="transportControl transportControl__button"><span className="transportControl__symbol"><i className="fas fa-eject"></i></span><br />CLEAR</button>
        </div>
      </section>
      <Settings
        bpm={bpm}
        changeBpm={newBpm => this.handleBpmChange(newBpm)}
        synthWaveForm={synthWaveForm}
        changeWaveForm={newWaveForm => this.changeWaveForm(newWaveForm)}
        loadedSongTitle={loadedSongTitle}
        loadedSongComposer={loadedSongComposer} />
    </div>
  )
}

}

export default Sequenser

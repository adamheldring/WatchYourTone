import React from "react"
import Tone from "tone"
import SeqInstrument from "./seqInstrument"
import "./sequenser.scss"

class Sequenser extends React.Component {

state = {
  drums: [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
  ],
  playing: false,
  activeBar: 0
}

componentDidMount = () => {
  this.drumsGenerator()
}
componentWillUnmount = () => {
  Tone.Transport.stop()
}

startPlaying = () => {
  console.log('PLAYING')
  Tone.Transport.start("+0.1")
  this.setState({ playing: true })
}

stopPlaying = () => {
  console.log('STOPPED')
  Tone.Transport.stop()
  this.setState({ playing: false })
}

handleNoteClick = (drumIndex, barIndex) => {
  let newDrumMatrix = this.state.drums
  newDrumMatrix[drumIndex][barIndex] = !this.state.drums[drumIndex][barIndex]
  this.setState({
    drums: newDrumMatrix
  })
}

drumsGenerator = () => {
  const drums = [
    new Tone.MembraneSynth(),
    new Tone.Synth(),
    new Tone.Synth()
  ]

  drums[0].oscillator.type = "sine"
  drums[1].oscillator.type = "sawtooth"
  drums[2].oscillator.type = "square"

  const gain = new Tone.Gain(0.3)
  gain.toMaster()

  drums.forEach(drum => drum.connect(gain))

  let index = 0

  Tone.Transport.bpm.value = 140
  Tone.Transport.scheduleRepeat((time) => {
    let step = index % 8
    const notes = ["C1", "C3", "C4"]
    for (let i = 0; i < this.state.drums.length; i++) {
      if (this.state.drums[i][step]) {
        drums[i].triggerAttackRelease(notes[i], "8n", time)
      }
    }
    index++
    this.setState({ activeBar: index % 8}, console.log(this.state.activeBar))
  }, "8n")

}

render() {
  const { drums, activeBar } = this.state
  return (
    <div className="sequenser-container">
      <h3>SEQUENSER</h3>
      <div className="drums-container">
        <table>
          <thead>
            <tr>
              {drums[0].map((bars, index) => {
                return <th className={(index === activeBar) ?
                  "barIndicator barIndicator--active" :
                  "barIndicator"
                }>{index}</th>
              })}
            </tr>
          </thead>
          <tbody>
          {this.state.drums.map((drum, drumIndex) => {
            return <SeqInstrument
              key={drumIndex}
              drumIndex={drumIndex}
              bars={drums[drumIndex]}
              drumMatrix={drums}
              handleNoteClick={(barIndex) => this.handleNoteClick(drumIndex, barIndex)}
            />
          })}


          </tbody>
        </table>
      </div>

      <div>
        <button onClick={this.startPlaying}>PLAY</button>
        <button onClick={this.stopPlaying}>STOP</button>
      </div>
    </div>
  )
}

}

export default Sequenser

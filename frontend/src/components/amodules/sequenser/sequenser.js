import React from "react"
import Tone from "tone"
import SeqInstrument from "./seqInstrument"
import { drumsGenerator } from "../../amodules/drumsGenerator.js"
import "./sequenser.scss"

class Sequenser extends React.Component {

state = {
  drums: [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
  ]
}

componentDidMount = () => {
  drumsGenerator()
}
componentWillUnmount = () => {
  Tone.Transport.stop()
}

startPlaying = () => {
  console.log('PLAYING')
  Tone.Transport.start("+0.1")
}

stopPlaying = () => {
  console.log('STOPPED')
  Tone.Transport.stop()
}

handleNoteClick = (drumIndex, barIndex) => {
  console.log("DrumIndex: ", drumIndex)
  console.log("BarIndex: ", barIndex)

  let newDrumMatrix = this.state.drums
  newDrumMatrix[drumIndex][barIndex] = !this.state.drums[drumIndex][barIndex]
  this.setState({
    drums: newDrumMatrix
  }, console.table(this.state.drums))
}


render() {
  return (
    <div className="sequenser-container">
      <h3>SEQUENSER</h3>
      <div className="drums-container">
        <table>
          <tbody>

          {this.state.drums.map((drum, drumIndex) => {
            return <SeqInstrument
              key={drumIndex}
              instrument={drumIndex}
              bars={this.state.drums[drumIndex]}
              drumMatrix={this.state.drums}
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

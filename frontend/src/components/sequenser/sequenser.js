import React from "react"
import Tone from "tone"
import "./sequenser.scss"

class Sequenser extends React.Component {

drumsGenerator = time => {
  console.log("drums")
  const drums = [
    new Tone.MembraneSynth(),
    new Tone.Synth(),
    new Tone.Synth()
  ]

  const gain = new Tone.Gain(0.3)
  gain.toMaster()

  drums[0].oscillator.type = "sine"
  drums[1].oscillator.type = "sawtooth"
  drums[2].oscillator.type = "square"


  drums.forEach(drum => drum.connect(gain))

  let index = 0
  Tone.Transport.scheduleRepeat(() => {
    if (index % 2 === 0) drums[0].triggerAttackRelease("C1", "8n", time)
    if (index % 8 === 0) drums[1].triggerAttackRelease("C4", "8n", time)
    drums[1].triggerAttackRelease("c7", "16n", time)


    // console.log(index)
    index++
  }, "8n")
  Tone.Transport.start()


  setTimeout(() => {
    Tone.Transport.stop()
  }, 5000)
}

render() {
  this.drumsGenerator()
  return (
    <div className="sequenser-container">
      <h3>SEQUENSER</h3>
      <div className="drums-container">
        <div className="hihat-container">
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </div>
        <div className="snare-container">
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </div>
        <div className="kick-container">
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
          <input type="checkbox" />
        </div>
      </div>
    </div>
  )
}

}

export default Sequenser

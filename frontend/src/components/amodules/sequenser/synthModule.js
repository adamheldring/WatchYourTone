import React from "react"
import SynthKey from "./synthKey"

class SynthModule extends React.Component {

  passUpNoteClick = (synthKeyIndex, barIndex) => {
    console.log("Someone clicked note inside synth")
    this.props.handleNoteClick(synthKeyIndex, barIndex)
  }

  render() {
    const { synth, activeBar } = this.props
    return (
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
                handleNoteClick={(barIndex) => this.passUpNoteClick(synthKeyIndex, barIndex)}
              />
            })}
            </tbody>
        </table>
      </div>
    )
  }

}

export default SynthModule

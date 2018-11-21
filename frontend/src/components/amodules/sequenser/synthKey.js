import React from "react"
import { SYNTH_NOTES } from "../../constants"

class SynthKey extends React.Component {


  render() {
    return (
      <tr className="synthKey-row">
        <td className="tableRowExplainer tableRowExplainer--synth">{SYNTH_NOTES[this.props.synthKeyIndex].slice(0,1)}</td>
        {this.props.bars.map((bar, barIndex) => {
          return <td
            className={this.props.synthKeyMatrix[this.props.synthKeyIndex][barIndex] ?
              "noteBox noteBox--active" : "noteBox"
            }
            key={barIndex}
            onClick={() => this.props.handleNoteClick(barIndex)}
          />
        })}
      </tr>
    )
  }

}

export default SynthKey

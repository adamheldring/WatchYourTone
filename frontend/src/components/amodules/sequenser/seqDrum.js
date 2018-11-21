import React from "react"
import { DRUM_ICONS } from "../../constants"

class SeqDrum extends React.Component {


  render() {
    return (
      <tr className="seqInstrument-row">
        <td className="tableRowExplainer tableRowExplainer--drums">
          <img src={DRUM_ICONS[this.props.drumIndex]} className="drumIcon" alt="drum"/>
        </td>
        {this.props.bars.map((bar, barIndex) => {
          return <td
            className={this.props.drumMatrix[this.props.drumIndex][barIndex] ?
              "beatBox beatBox--active" : "beatBox"
            }
            key={barIndex}
            onClick={() => this.props.handleDrumClick(barIndex)}
          />
        })}
      </tr>
    )
  }

}

export default SeqDrum

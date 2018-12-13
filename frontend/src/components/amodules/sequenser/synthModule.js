import React from "react"
import SynthKey from "./synthKey"
import { COLOR_GRADIENT } from "../../constants"

class SynthModule extends React.Component {

  passUpNoteClick = (synthKeyIndex, barIndex) => {
    this.props.handleNoteClick(synthKeyIndex, barIndex)
  }

  render() {
    const { synth, activeBar } = this.props
    return (
      <div className="synth-container">
        <table>
          <thead>
            <tr>
              <td className="tableRowExplainer tableRowExplainer--bars">
                <img src={"./assets/note-100-inv.png"} className="drumIcon" alt="note"/>
              </td>
              {synth[0].map((bars, index) => {
                return <th key={index} style={{backgroundColor: (index === activeBar) ? `#${COLOR_GRADIENT[index]}` : 'darkgrey'}} className={(index === activeBar) ?
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
                handleNoteClick={barIndex => this.passUpNoteClick(synthKeyIndex, barIndex)} />
            })}
            </tbody>
        </table>
      </div>
    )
  }

}

export default SynthModule

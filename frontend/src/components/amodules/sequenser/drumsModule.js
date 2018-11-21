import React from "react"
import SeqDrum from "./seqDrum"
import { COLOR_GRADIENT } from "../../constants"

class DrumsModule extends React.Component {

  passUpBeatClick = (drumIndex, barIndex) => {
    console.log("Someone clicked beat inside drums")
    this.props.handleDrumClick(drumIndex, barIndex)
  }

  render() {
    const { drums, activeBar } = this.props
    return (
      <div className="drums-container">
        <table>
          <thead>
            <tr>
              <td className="tableRowExplainer tableRowExplainer--bars"></td>
              {drums[0].map((bars, index) => {
                return <th key={index} style={{backgroundColor: (index === activeBar) ? `#${COLOR_GRADIENT[index]}` : 'darkgrey'}} className={(index === activeBar) ?
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
                handleDrumClick={(barIndex) => this.passUpBeatClick(drumIndex, barIndex)}
              />
            })}
            </tbody>
        </table>
      </div>
    )
  }

}

export default DrumsModule

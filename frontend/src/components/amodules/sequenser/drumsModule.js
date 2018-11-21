import React from "react"
import SeqDrum from "./seqDrum"

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
                handleDrumClick={(barIndex) => this.passUpBeatClick(drumIndex, barIndex)}
              />
            })}
            </tbody>
        </table>
      </div>







      // <div className="synth-container">
      //   <table>
      //     <thead>
      //       <tr>
      //         {synth[0].map((bars, index) => {
      //           return <th key={index} className={(index === activeBar) ?
      //             "barIndicator barIndicator--active" :
      //             "barIndicator"
      //           }>{index + 1}</th>
      //         })}
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {synth.map((synthKey, synthKeyIndex) => {
      //         return <SynthKey
      //           key={synthKeyIndex}
      //           synthKeyIndex={synthKeyIndex}
      //           bars={synth[synthKeyIndex]}
      //           synthKeyMatrix={synth}
      //           handleNoteClick={(barIndex) => this.passUpNoteClick(synthKeyIndex, barIndex)}
      //         />
      //       })}
      //       </tbody>
      //   </table>
      // </div>
    )
  }

}

export default DrumsModule

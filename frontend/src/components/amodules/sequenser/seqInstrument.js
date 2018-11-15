import React from "react"

class SeqInstrument extends React.Component {


render() {
  console.log(this.props.bars)
  return (
    <tr className="seqInstrument-row">
      {this.props.bars.map((bar, barIndex) => {
        return <td
          className="noteBox"
          key={barIndex}
          onClick={() => this.props.handleNoteClick(barIndex)}
        >{barIndex+1}</td>
      })}
    </tr>
  )
}

}

export default SeqInstrument

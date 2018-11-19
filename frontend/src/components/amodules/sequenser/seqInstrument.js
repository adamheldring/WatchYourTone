import React from "react"

class SeqInstrument extends React.Component {


  render() {
    return (
      <tr className="seqInstrument-row">
        {this.props.bars.map((bar, barIndex) => {
          return <td
            className={this.props.drumMatrix[this.props.drumIndex][barIndex] ?
              "noteBox noteBox--active" : "noteBox"
            }
            key={barIndex}
            onClick={() => this.props.handleDrumClick(barIndex)}
          />
        })}
      </tr>
    )
  }

}

export default SeqInstrument

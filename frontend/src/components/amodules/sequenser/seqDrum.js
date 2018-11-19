import React from "react"

class SeqDrum extends React.Component {


  render() {
    return (
      <tr className="seqInstrument-row">
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

import React from "react"

class SynthKey extends React.Component {


  render() {
    return (
      <tr className="synthKey-row">
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

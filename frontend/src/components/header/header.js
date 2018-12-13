import React from "react"
import "./header.scss"

class Header extends React.Component {

  render() {
    return (
      <div className="header-container">
        <div className="header__mainHeading-container">
          <h2 className="header__mainHeading">WATCH YOUR TONE</h2>
          <h2 className="header__mainHeading header__mainHeading--shadow">WATCH YOUR TONE</h2>
        </div>
      </div>
    )
  }

}

export default Header

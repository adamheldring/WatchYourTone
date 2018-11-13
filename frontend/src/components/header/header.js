import React from "react"
import { Link } from "react-router-dom"
import "./header.scss"

class Header extends React.Component {

  render() {
    return (
      <div className="header-container">
        <h2>HEADER</h2>
        <nav className="nav-container">
          <Link to="/">START</Link>
        </nav>
      </div>
    )
  }

}

export default Header

import React from "react"
import { Link } from "react-router-dom"
import "./header.scss"

class Header extends React.Component {

  render() {
    return (
      <div className="header-container">
        <h2>WATCH YOUR TONE</h2>
        <nav className="nav-container">
          <Link to="/" className="menuItem">COMPOSE</Link>
          <Link to="/settings/" className="menuItem">SETTINGS</Link>
          <Link to="/saveload/" className="menuItem">SAVE/LOAD</Link>
        </nav>
      </div>
    )
  }

}

export default Header

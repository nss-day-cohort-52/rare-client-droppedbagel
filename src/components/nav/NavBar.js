import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = ({ token, setToken }) => {
  const history = useHistory()
  const navbar = useRef()
  const hamburger = useRef()

  const admin = localStorage.getItem('isStaff')

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  return (
    <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem" /> <h1 className="title is-4">Rare Publishing</h1>
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {
            token
              ?
              <>
              <Link to="/posts" className="navbar-item">Posts</Link>
              {admin == "true" ? <Link to="/adminposts" className="navbar-item">AdminPosts</Link> : ''}
              {admin == "true" ? <Link to="/categories" className="navbar-item">Category Manager</Link> : "" }
              {admin == "true" ? <Link to="/users" className="navbar-item">User Management</Link> : "" }
              {admin == "true" ? <Link to="/reactions" className="navbar-item">Reaction Management</Link> : "" }
              {admin == "true" ? <Link to="/tags" className="navbar-item">Tag Management</Link> : "" }
              <Link to="/userposts" className="navbar-item">My Posts</Link>
              <Link to="/new-post" className="navbar-item">New Post</Link>
              </>
              :
              ""
          }
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                token
                  ?
                  <button className="button is-outlined" onClick={() => {
                    setToken('')
                    localStorage.removeItem('isStaff')
                    history.push('/login')
                  }}>Logout</button>
                  :
                  <>
                    <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

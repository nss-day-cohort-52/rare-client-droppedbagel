import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { registerUser } from "./AuthManager"
import "./auth.css"
import Logo from "../nav/rare.jpeg"

export const Register = ({ setToken }) => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const bio = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const history = useHistory()
  const [profilePic, setProfilePic] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
        profile_pic: profilePic
      }
      // need to register user

      registerUser(newUser)
        .then(res => {
          if ("valid" in res && res.valid) {
            setToken(res.token, res.userid, res.isStaff)
            history.push("/")
          }
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
}

  const createUserImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
        setProfilePic(base64ImageString)
    });
}

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds registerflex" onSubmit={handleRegister}>

        <div className="titlediv">
          <h1 className="title">Rare</h1>
        </div>

        <div className="contentdiv">
          <div className="left">
            <div>
              <img src={Logo} className="imgcentered" />
            </div>

            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="First Name" ref={firstName} />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="Last Name" ref={lastName} />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input className="input" type="email" placeholder="Email" ref={email} />
              </div>
            </div>
          </div>

          <div className="right">
            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="Username" ref={username} />
              </div>
            </div>
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Password" ref={password} />
              </p>
            </div>
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
              </p>
            </div>
            <div className="field">
              <input type="file" id="user_image" onChange={createUserImageString} />
            </div>
            <div className="field">
              <div className="control">
                <textarea className="textarea" placeholder="Bio" ref={bio}></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="buttondiv">
          <div className="control">
            <button className="button is-link" type="submit">Register</button>
          </div>
        </div>

      </form>
    </section>
  )
}

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import { MdAccountCircle, MdEmail, MdOutlineLock } from "react-icons/md";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  }

  function handleSelect(event) {
    const { name, value } = event.target;
    setRole(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(true);
      setErrorMsg("Passwords do not match");
      setTimeout(() => {
        setErrorMsg("");
        setError(false);
      }, 5000);
      return;
    } else {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role
        }),
      });

      const data = await response.json();
      if (data.status === "error") {
        setError(true);
        setErrorMsg(data.message);
        setTimeout(() => {
          setErrorMsg("");
          setError(false);
        }, 5000);
        return;
      } else {
        history.push("/login");
      }
    }
  }

  return (
    <div className="register">
      {/* <div className="heading">MERN Quiz</div> */}
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="username">
          <MdAccountCircle /> Enter Name
        </label>
        <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">
          <MdEmail /> Enter Email
        </label>
        <br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">
          <MdOutlineLock /> Enter Password
        </label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="confirmPassword">
          <MdOutlineLock /> Confirm Password
        </label>
        <br />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="type">
          <MdOutlineLock /> Select Type
        </label>
        <br />
        <select
          className="role"
          name="role"
          value={role}
          onChange={handleSelect}
        >
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <br />
        <br />
        <button type="submit">Register</button> <Link to="/login">Login</Link>
        {error && <div className="error">{errorMsg}</div>}
      </form>
    </div>
  );
}
export default Register;

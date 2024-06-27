import React, {useState} from 'react'
import '../css/auth.css'
import axios from 'axios'
import {useCookies} from'react-cookie'
import { useNavigate, Link } from 'react-router-dom'
import Profile from './profile'



const Auth = () => {
    const [cookies, setCookies] = useCookies(["access_token"])

  return (
    <div className="auth-container">
      <div className="back-to-home-btn">
        <Link to="/">
          <button role="button">Back To Home</button>
        </Link>
      </div>
      <div className="authentication-title">
        <h1>Authentication</h1>
      </div>
      <div className="reg-log">
        <Register />
        <Login />
      </div>
    </div>
  );
}

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post("http://localhost:5000/users/register", {
          username,
          password,
        });
        alert("You have been succesfully registered");
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"Register"}
        onSubmit={onSubmit}
      />
    ); 
}

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [_, setCookies] = useCookies(["access_token"]);

    const onSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post("http://localhost:5000/users/login", {
          username,
          password,
        });

        setCookies("access_token", response.data.token); // takes the data.token and sets it in the variable access token that the function turns into a cookie
        window.localStorage.setItem("userID", response.data.userID); //putting the id of the user in the lcoal host
        if (window.localStorage.getItem("userID") === "undefined") {
          alert(
            "This account does not exist please register your account first"
          );
          return;
        }
        navigate("/profile");
        alert("You are now logged in");
        
      } catch (err) {
        console.log(err);
      }
    };


    return (
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"Login"}
        onSubmit={onSubmit}
      />
    );
}

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth">
      <form onSubmit={onSubmit}>
        <h2> {label} </h2>
        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" type="submit">{label}</button>
      </form>
    </div>
  );
};

export default Auth
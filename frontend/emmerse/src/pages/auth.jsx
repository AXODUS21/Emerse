import React, {useState} from 'react'
import '../css/auth.css'
import axios from 'axios'
import {useCookies} from'react-cookie'
import Profile from './profile'


const Auth = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);

  return (
    <div className="auth-container">
      {!cookies.access_token ? (
        <div className='auth'>
          <Register />
          <Login />
        </div>
      ) : (
        <Profile/>
      )}
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
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2> {label} </h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">{label}</button>
      </form>
    </div>
  );
};

export default Auth
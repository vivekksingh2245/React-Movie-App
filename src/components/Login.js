import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

/*API*/
import API from "../API";

/*Components*/
import Button from "./Button";

/*Styles*/
import { Wrapper } from "./Login.styles";

/*Context*/
import { Context } from "../context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  /*Now we'll grab our context using useContext() hook*/
  const [_user, setUser] = useContext(Context);

  /*Navigation*/
  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    setError(false);

    try {
      const requestToken = await API.getRequestToken();

      const sessionId = await API.authenticate(
        requestToken,
        username,
        password
      );
      console.log("session id is: ", sessionId);
      setUser({ sessionId: sessionId.session_id, username });

      navigate("/");
    } catch {
      setError(true);
    }
  };

  return (
    <Wrapper>
      {error && (
        <div className="error">
          There was some error! Retry with correct{" "}
          <a href="https://www.themoviedb.org/">TMDB</a> username and password.
        </div>
      )}
      <label>Username:</label>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleInput}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleInput}
      />
      <Button text="Login" callback={handleSubmit} />
    </Wrapper>
  );
};

export default Login;

import { useState, FormEvent, ChangeEvent } from "react";

import Auth from "../utils/auth";
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // create an error state variable
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      setError(""); // Clear any previous error
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
      // set the error once the login fails
      setError("Invalid username or password");
      setLoginData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username || ""}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password || ""}
          onChange={handleChange}
        />
        <button type="submit">Submit Form</button>
        {error && <p style={{ fontWeight: "bolder" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;

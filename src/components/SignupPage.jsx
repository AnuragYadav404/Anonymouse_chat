import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [loading, set_is_loading] = useState(false);
  const [error, set_error] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    set_is_loading(true);
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/accounts/signup",
        withCredentials: true,
        data: {
          username, // here both these fields
          password, // need to be validated
        },
        headers: {
          "Content-Type": "application/json", // Adjust content type as needed
        },
      });
      const data = response.data;
      console.log(data);
      if (data.statusCode === 200) {
        // update the user_id global state
        // here we would redirect to login page!
        // dispatch an action
        set_is_loading(false);
      } else {
        set_is_loading(false);
        set_error("Failed to login");
      }
    } catch (err) {
      set_is_loading(false);
      set_error(err.message);
    }
  }

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <i>Loading</i>}
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          min={3}
          max={16}
          onChange={(e) => set_username(e.target.value)}
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          min={5}
          max={16}
          onChange={(e) => set_password(e.target.value)}
        />
        <br />

        <button type="submit">Signup</button>
      </form>
    </>
  );
}

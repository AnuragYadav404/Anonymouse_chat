import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login_user, select_user_status } from "../features/user/userSlice";

export default function LoginPage() {
  const user_state = useSelector(select_user_status);
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [error, set_error] = useState(null);

  const [loading, set_loading] = useState(false);
  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();
    set_loading(true);
    const response = await dispatch(
      login_user({
        username,
        password,
      })
    );
    console.log("resposne is btw", response);
    set_loading(false);
  }

  return (
    <>
      {error && <p>{error}</p>}
      {!user_state.is_logged_in && (
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => set_username(e.target.value)}
          />
          <br />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => set_password(e.target.value)}
          />
          <br />

          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>
      )}
    </>
  );
}

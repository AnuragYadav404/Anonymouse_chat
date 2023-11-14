import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { select_user_status } from "../features/user/userSlice";
import { signup_user } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [loading, set_is_loading] = useState(false);
  const [error, set_error] = useState(null);
  const user_state = useSelector(select_user_status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handlesignup(e) {
    e.preventDefault();
    set_is_loading(true);
    const response = await dispatch(
      signup_user({
        username,
        password,
      })
    ).unwrap();
    console.log("response is", response);
    if (response.statusCode === 200) {
      navigate("/accounts/login");
    } else {
      set_error(response.msg);
    }
    set_is_loading(false);
  }

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <i>Loading</i>}
      {!user_state.is_logged_in && (
        <form onSubmit={handlesignup}>
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
      )}
    </>
  );
}

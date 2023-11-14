import { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import {
  select_user_status,
  fetch_login_status,
} from "./features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

// implement a global user state?
export default function App() {
  const user_state = useSelector(select_user_status);
  console.log(user_state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user_state.fetch_status === "idle") {
      dispatch(fetch_login_status());
    }
  }, [user_state.fetch_status, dispatch]);

  return (
    <>
      <div id="sidebar">
        {user_state.fetch_status !== "fullfilled" && (
          <i>Fetching user status ...</i>
        )}
        {user_state.is_logged_in && <Link to={"/accounts/chat"}>Chat</Link>}
        {!user_state.is_logged_in &&
          user_state.fetch_status === "fullfilled" && (
            <Link to={"/accounts/login"}>Login</Link>
          )}
        {!user_state.is_logged_in &&
          user_state.fetch_status === "fullfilled" && (
            <Link to={"/accounts/signup"}>signup</Link>
          )}
        {user_state.is_logged_in &&
          user_state.fetch_status === "fullfilled" && (
            <Link to={"/accounts/logout"}>Logout</Link>
          )}
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

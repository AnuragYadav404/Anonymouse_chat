import { useEffect, useState } from "react";
import Chat from "./Chat";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

// implement a global user state?
export default function App() {
  const [user_id, set_user_id] = useState(null);
  const [is_loading, set_is_loading] = useState(false);
  const [error, set_error] = useState(null);

  useEffect(() => {
    async function fetch_logged_in_user_details() {
      set_is_loading(true);
      try {
        const is_logged_in_response = await axios({
          method: "GET",
          url: "http://localhost:3000/accounts/is_logged_in",
          withCredentials: true,
        });
        const response_data = is_logged_in_response.data;
        console.log("fetched logged in details is: ", response_data);
        if (response_data.status) {
          set_user_id(response_data.user_id);
        }
        set_is_loading(false);
      } catch (err) {
        set_error(err.message);
        set_is_loading(false);
      }
    }
    fetch_logged_in_user_details();
  }, []);

  return (
    <>
      <div id="sidebar">
        <h2>Hello world!</h2>
        {is_loading && <i>loading ...</i>}
        {error && <i>Error: {error}</i>}
        {!user_id && !error && (
          <p>You must be logged in as a user to access the chat!</p>
        )}
        {user_id && <i>user id: {user_id}</i>}
        {!user_id && !error && (
          <Link to={"/accounts/login"}>
            <p>Login</p>
          </Link>
        )}
        {!user_id && !error && (
          <Link to={"/accounts/signup"}>
            <p>signup</p>
          </Link>
        )}

        {/* {!user_id && <Link to={"/accounts/login"}></Link>} */}
        {user_id && !error && <Chat />}
      </div>
      {!error && (
        <div id="detail">
          <Outlet />
        </div>
      )}
    </>
  );
}

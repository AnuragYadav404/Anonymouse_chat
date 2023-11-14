import { useDispatch, useSelector } from "react-redux";
import { logout_user, select_user_status } from "../features/user/userSlice";
import { useState } from "react";

export default function LogoutPage() {
  const user_state = useSelector(select_user_status);
  const [loading, set_loading] = useState(false);
  console.log(user_state);
  const dispatch = useDispatch();

  async function handlelogout(e) {
    e.preventDefault();
    set_loading(true);
    const result = await dispatch(logout_user()).unwrap();
    set_loading(false);
  }
  return (
    <>
      {user_state.is_logged_in && (
        <>
          <form onSubmit={handlelogout}>
            <button type="submit" disabled={loading}>
              Logout
            </button>
          </form>
        </>
      )}
    </>
  );
}

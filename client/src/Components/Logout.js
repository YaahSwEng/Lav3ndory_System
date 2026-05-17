import { useEffect } from "react";

// Redux dispatch
import { useDispatch } from "react-redux";

// Logout thunk from UserSlice
import { logout } from "../Features/UserSlice";

// Navigation
import { useNavigate } from "react-router-dom";

const Logout = () => {

  // Redux dispatch
  const dispatch = useDispatch();

  // React router navigation
  const navigate = useNavigate();

  // Run logout when page opens
  useEffect(() => {

    // Call logout thunk
    dispatch(logout());

    // Remove saved user from local storage
    localStorage.removeItem("user");

    // Redirect user to home page
    navigate("/");

  }, [dispatch, navigate]);

  return (

    <div className="logout-page">

      {/* Logout message */}

      <h2>Logging out...</h2>

    </div>
  );
};

export default Logout;
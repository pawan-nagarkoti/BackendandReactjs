import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Headers = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("emailVerificationToken");
    navigate("/login");
  };

  return (
    <>
      <nav className="d-flex gap-3">
        {!localStorage.getItem("token") && (
          <>
            <button>
              <Link to="/">Register</Link>
            </button>
            <button>
              <Link to="/login">Login</Link>
            </button>
          </>
        )}
        {localStorage.getItem("token") && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </>
  );
};

export default Headers;

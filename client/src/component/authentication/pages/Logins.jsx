import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/ApiMethods";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Logins = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLoginForm = (e) => {
    e.preventDefault();
    loginMutation({
      username,
      password,
    });
    setUsername("");
    setPassword("");
  };
  const {
    isPending,
    mutate: loginMutation,
    data: getLoginData,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => postRequest("users/login", data),
  });
  if (isPending)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  if (isSuccess) {
    localStorage.setItem("token", getLoginData.data.data.accessToken);
    const tokens = getLoginData.data.data.accessToken;
    const decoded = jwtDecode(tokens);
    console.log("token Decode", decoded);
    // let a = decoded.exp;

    const unixTimestamp = decoded.exp;
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
    const formattedDate = date.toUTCString(); // Convert to UTC date and time string

    console.log("exp (Expiration Time): " + formattedDate);

    setTimeout(() => navigate("/userDashboard"));
  }

  return (
    <>
      <form onSubmit={handleLoginForm}>
        <label htmlFor="username" className="mt-2">
          username
        </label>
        <input type="text" id="username" value={username || ""} onChange={(e) => setUsername(e.target.value)} /> <br />
        <label htmlFor="password" className="mt-2">
          password
        </label>
        <input type="text" id="password" value={password || ""} onChange={(e) => setPassword(e.target.value)} /> <br />
        <button className="mt-2">submit</button>
        <div className="mt-2">
          {/* <h6 onClick={() => navigate("/changePassword")}>Change Current Password</h6> */}
          <button onClick={() => navigate("/login/forgotPassword")}>Forgot Password Request</button>
          <button onClick={() => navigate("/login/resetPassword")}>Reset Forgotten Password</button>
        </div>
      </form>
    </>
  );
};

export default Logins;

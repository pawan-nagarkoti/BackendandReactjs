import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRequest } from "../api/apiCall";
import { loginUserDetail } from "../store/features/shareSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };
    try {
      setLoading(true);
      const response = await postRequest("users/login", loginData);
      // if (response) {
      //   const data = {
      //     data: response.data.data,
      //   };
      //   navigate("/userDetail", { state: data });
      // }
      setLoading(false);
      if (response) {
        const token = response.data.data.accessToken;
        localStorage.setItem("token", token);
        dispatch(loginUserDetail(response?.data?.data));
        navigate("/userDetail");
      }
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <h1>Login Page</h1>
      {error && <h6>Something wrong!</h6>}
      {loading && <h6>Loading...</h6>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name=""
          id="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name=""
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">submit</button>
        <br />
      </form>
      {/* <Link to="changePassword">change current password</Link> */}
    </>
  );
};

export default Login;

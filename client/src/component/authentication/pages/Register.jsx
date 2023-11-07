import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/ApiMethods";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../../store/features/userInfoSlice";

const Register = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [roles, setRoles] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterData = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      username,
      role: roles,
    };
    console.log(data);
    mutationRegister.mutate(data);
    setEmail("");
    setPassword("");
    setUsername("");
    setRoles("");
  };

  const mutationRegister = useMutation({
    mutationFn: async (data) => {
      let response = await postRequest("users/register", data);
      let userInformation = {
        userId: response.data.data.user._id,
        role: response.data.data.user.role,
        name: response.data.data.user.username,
      };
      dispatch(getUserInfo(userInformation));
    },
    onSuccess: () => {
      // navigate("/login");
      navigate("/adminDashboard");
    },
  });

  if (mutationRegister.isPending)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <>
      <form onSubmit={handleRegisterData}>
        <label htmlFor="email" className="mt-2">
          Email
        </label>
        <input type="text" value={email || ""} id="eamil" onChange={(e) => setEmail(e.target.value)} /> <br />
        <label htmlFor="password" className="mt-2">
          Password
        </label>
        <input type="text" id="password" value={password || ""} onChange={(e) => setPassword(e.target.value)} /> <br />
        <label htmlFor="username" className="mt-2">
          username
        </label>
        <input type="text" id="username" value={username || ""} onChange={(e) => setUsername(e.target.value)} /> <br />
        <label htmlFor="role">Role</label>
        <select id="role" value={roles || ""} onChange={(e) => setRoles(e.target.value)}>
          <option value="">select role</option>
          <option value="ADMIN">admin</option>
          <option value="USER">user</option>
        </select>
        <br />
        <button className="mt-2">Submit</button>
      </form>
    </>
  );
};

export default Register;

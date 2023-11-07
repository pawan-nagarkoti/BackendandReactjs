import React, { useState } from "react";
import { postRequest } from "../api/apiCall";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldpass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const navigate = useNavigate();

  const handleOldPassword = (e) => {
    setOldPass(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setNewPass(e.target.value);
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const data = {
      newPassword: newPass,
      oldPassword: oldpass,
    };
    try {
      // const response = await postRequest("users/change-password", data);
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/change-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Password change sucessfully!");
      navigate("/userDetail");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="oldPassword">old password</label>
        <input
          type="password"
          name=""
          id="oldPassword"
          placeholder="old password"
          onChange={handleOldPassword}
        />
        <br />
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          name=""
          id="newPassword"
          placeholder="newPassword"
          onChange={handleConfirmPassword}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default ChangePassword;

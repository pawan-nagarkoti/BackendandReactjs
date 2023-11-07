import React, { useState } from "react";
import { authenticatePostData } from "../api/ApiMethods";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const ChangePasswords = () => {
  const [oldPassword, SetOldPassword] = useState("");
  const [newPassword, SetNewPassword] = useState("");
  const navigate = useNavigate();
  const handleChangePassword = (e) => {
    e.preventDefault();
    changePasswordMutation({
      newPassword,
      oldPassword,
    });
    SetOldPassword("");
    SetNewPassword("");
  };

  const { isPending, mutate: changePasswordMutation } = useMutation({
    mutationFn: (data) => authenticatePostData("users/change-password", data, localStorage.getItem("token")),
    onSuccess: () => {
      navigate("/userDashboard");
    },
  });

  if (isPending)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <form onSubmit={handleChangePassword}>
      <label htmlFor="old-password">Old Password</label>
      <input type="text" id="old-password" onChange={(e) => SetOldPassword(e.target.value)} value={oldPassword} /> <br />
      <label htmlFor="New-password">New Password</label>
      <input type="text" id="New-password" onChange={(e) => SetNewPassword(e.target.value)} value={newPassword} /> <br />
      <button type="submit" className="mt-2">
        submit
      </button>
    </form>
  );
};

export default ChangePasswords;

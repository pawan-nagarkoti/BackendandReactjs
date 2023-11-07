import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/ApiMethods";
import { useNavigate } from "react-router-dom";

const ResetPasswords = () => {
  const [newPassword, setNewPassword] = useState(null);
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    resetPasswordMutation({ newPassword });
  };
  const {
    isPending,
    mutate: resetPasswordMutation,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => postRequest(`users/reset-password/${localStorage.getItem("token")}`, data),
  });

  if (isPending)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  if (isSuccess) {
    return navigate("/login");
  }
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="" id="" value={newPassword || ""} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default ResetPasswords;

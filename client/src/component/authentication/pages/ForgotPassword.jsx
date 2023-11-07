import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../api/ApiMethods";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    forgotPasswordMutation({ email });
    setEmail("");
  };

  const {
    isPending,
    mutate: forgotPasswordMutation,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => postRequest("users/forgot-password", data),
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
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="" id="" value={email || ""} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
      <button type="submit">submit</button>
    </form>
  );
};

export default ForgotPassword;

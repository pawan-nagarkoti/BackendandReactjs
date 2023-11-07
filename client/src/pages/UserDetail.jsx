import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchRequest } from "../api/apiCall";
import axios from "axios";
import { checkProfileUpdate } from "../store/features/shareSlice";
import { Link, useNavigate } from "react-router-dom";

const UserDetail = () => {
  const data = useSelector((state) => state.userDetail.loginUserData);
  const dispatch = useDispatch();
  const {
    user: { email, isEmailVerified, loginType, role, username },
    accessToken,
    refreshToken,
  } = data;

  const handleChangeProfile = async (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const formData = new FormData();
      formData.append("avatar", selectedImage);
      try {
        const response = await axios.patch(
          "http://localhost:8080/api/v1/users/avatar",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            "Content-Type": "multipart/form-data",
          }
        );
        function checkProfilePic() {
          const profilePic = response.data.data.avatar.url;
          localStorage.setItem("profilePic", profilePic);
        }

        if (localStorage.getItem("profilePic")) {
          localStorage.removeItem("profilePic");
          dispatch(checkProfileUpdate(true));
          checkProfilePic();
        } else {
          checkProfilePic();
          dispatch(checkProfileUpdate(true));
        }
      } catch (error) {
        console.log("Error response:", error.response);
      }
    }
  };

  const handleVerifyEmail = () => {};
  return (
    <div>
      <h1>User detail</h1>
      <div className="d-flex">
        <h5>email :</h5>
        <span>{email}</span>
      </div>
      <div className="d-flex">
        <h5>username :</h5>
        <span>{username}</span>
      </div>
      <div className="d-flex">
        <h5>Role :</h5>
        <span>{role}</span>
      </div>
      <div className="d-flex">
        <h5>Loginty :</h5>
        <span>Email</span>
      </div>
      <div className="d-flex">
        <h5>Email verified :</h5>
        <span>
          {isEmailVerified ? "email is verified" : "email is not verified"}
        </span>
      </div>
      <div className="d-flex">
        <h5>Login Type</h5>
        <span>{loginType}</span>
      </div>
      {/* <button onClick={handleChangeProfile}>Change Profile Pic</button> &nbsp; */}
      <input type="file" onChange={handleChangeProfile} /> <br />
      <button onClick={handleVerifyEmail}>Verify Email</button> <br />
      <Link to="changePassword">change current password</Link>
    </div>
  );
};

export default UserDetail;

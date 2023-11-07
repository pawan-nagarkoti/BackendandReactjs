import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getRequest, { authenticatedRequest, changeAvtarPic, postRequest } from "../api/ApiMethods";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [file, setFile] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authenticatedRequest("users/current-user", localStorage.getItem("token")),
  });

  // // useEffect(() => {
  // const a = async () => {
  //   try {
  //     const response = await Axios.get(`/${URL}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     let refresh = false;

  //     axios.interceptors.response.use(
  //       (resp) => resp,
  //       async (error) => {
  //         if (error.response.status === 401 && !refresh) {
  //           refresh = true;

  //           const response = await axios.post("refresh", {}, { withCredentials: true });

  //           if (response.status === 200) {
  //             axios.defaults.headers.common["Authorization"] = `Bearer ${response.data["token"]}`;

  //             return axios(error.config);
  //           }
  //         }
  //         refresh = false;
  //         return error;
  //       }
  //     );
  //     throw Error(error.response.data.message);
  //   }
  // };
  // a();
  // // }, []);

  const hanldeChangeProfilePic = async () => {
    const formData = new FormData();
    formData.append("avatar", file);
    getProfilePicMutation(formData);
  };

  const {
    isPending,
    mutate: getProfilePicMutation,
    data: avtarData,
  } = useMutation({
    mutationFn: (formData) => changeAvtarPic("users/avatar", formData, localStorage.getItem("token")),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  // if (avtarData) localStorage.setItem("emailVerificationToken", avtarData.data.data.emailVerificationToken);

  const {
    email,
    isEmailVerified,
    username,
    role,
    avatar: { url },
    _id,
  } = data.data.data;

  const hanldeVerificationEmail = async () => {
    // await authenticatedRequest(`users/verify-email/${objectToken}`, localStorage.getItem("token"));
    // try {
    //   const response = await axios.get(`http://localhost:8080/api/v1/users/verify-email/${localStorage.getItem("emailVerificationToken")}`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   });
    //   // return response;
    // } catch (error) {
    //   throw Error(error.response.data.message);
    // }
  };

  // const handleResendEmailVerification = () => {
  //   postRequest("users/resend-email-verification", null);
  // };
  return (
    <main>
      <h5>User Dashboard</h5>
      {data && (
        <>
          {!isPending ? (
            <>
              <img src={url} alt="" width="200" height="200" /> <br />
            </>
          ) : (
            <>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <br />
            </>
          )}
          <input type="file" name="" id="" onChange={(e) => setFile(e.target.files[0])} /> <br />
          <div className="d-flex align-items-center">
            <h6 className="mt-2">Email</h6>
            <span>{email}</span>
          </div>
          <div className="d-flex align-items-center">
            <h6 className="mt-2">Username</h6>
            <span>{username}</span>
          </div>
          <div className="d-flex align-items-center">
            <h6 className="mt-2">Role</h6>
            <span>{role}</span>
          </div>
          <div className="d-flex align-items-center">
            <h6 className="mt-2">Email Verified</h6>
            <span>{isEmailVerified ? "Verified" : "Not verified"}</span>
          </div>
          <div className="d-flex align-items-center">
            <h6 className="mt-2">Do you want to verify your email</h6>
            <button onClick={hanldeVerificationEmail}>Yes</button>
          </div>
          <div className="d-flex align-items-center">
            <h6 className="mt-2">Resend Email Verification</h6>
            {/* <button onClick={handleResendEmailVerification}>Yes</button> */}
          </div>
          <button onClick={() => navigate("/changePassword")}>Change Current Password</button> <br />
          <button className="mt-2" onClick={hanldeChangeProfilePic}>
            Change Profile Pic
          </button>
          <br />
          {role === "ADMIN" && <button onClick={() => navigate("/adminDashboard")}>AdminDashboard</button>}
        </>
      )}
    </main>
  );
};

export default UserDashboard;

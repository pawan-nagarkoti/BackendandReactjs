import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { authenticatePostData, postRequest } from "../api/ApiMethods";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const userIdWithRole = useSelector((state) => state.userInfo.value);
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState(null);
  const handleChangeRole = (userid, role) => {
    changeRole(userid);
  };

  const { mutate: changeRole, isPending } = useMutation({
    mutationFn: (userid) => {
      postRequest(
        `users/assign-role/${userid}`,
        {
          role: roleId,
        }
        // localStorage.getItem("token")
      );
    },
  });

  if (isPending)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <>
      <table className="table table-bordered text-center mt-5">
        <thead>
          <tr>
            <th>name</th>
            <th>User Id</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userIdWithRole.map(({ name, userId, role }, i) => (
            <tr key={i}>
              <td>{name}</td>
              <td>{userId}</td>
              <td>
                <select name="" id="" onChange={(e) => setRoleId(e.target.value)}>
                  <option value={role}>{role}</option>
                  {role === "ADMIN" ? <option value="USER">user</option> : <option value="ADMIN">admin</option>}
                </select>
              </td>
              <td>
                <button onClick={() => handleChangeRole(userId, role)}>Change Role</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/userDashboard")}>Navigate to user dashboard</button>
    </>
  );
};

export default AdminDashboard;

import React from "react";

const AdminDetails = () => {
  return (
    <>
      <h1>Admin Detail</h1>
      <div className="d-flex">
        <h5>username:</h5>
        <span>Pawan</span>
      </div>
      <button>change profile pic</button>
      <h5>Verify Account</h5>
      <button>verify</button> &nbsp;
      <button>username</button> &nbsp;
      <button>email</button>
      <h5>Change Role</h5>
    </>
  );
};

export default AdminDetails;

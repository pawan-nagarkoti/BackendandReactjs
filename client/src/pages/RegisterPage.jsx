import React, { useState } from "react";
import { postRequest } from "../api/apiCall";
import { Formik } from "formik";
import RegisterPageValidate from "./validation/RegisterPageValidate";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <h1>Register Page</h1>
      {loading && <h6>Loading...</h6>}
      {error && <h6>Something wents wrong!</h6>}
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          role: "",
        }}
        validationSchema={RegisterPageValidate}
        onSubmit={async (values, { resetForm }) => {
          resetForm({ values: "" });
          try {
            setLoading(true);
            await postRequest("users/register", values);
            setLoading(false);
            navigate("/login");
          } catch (error) {
            setError(true);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="eamil"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <br />
            <label htmlFor="username">username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <br />
            <label htmlFor="role">role</label>
            <select
              name="role"
              id="role"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
            >
              <option value="ADMIN">admin</option>
              <option value="USER">user</option>
              <option value="moderator">moderator</option>
            </select>
            <br />
            <button type="submit">submit</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegisterPage;

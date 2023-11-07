import Todo from "./component/todo/Todo";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDetail from "./pages/UserDetail";
import ChangePassword from "./pages/ChangePassword";
import ForgotPasswordViaEmail from "./pages/ForgotPasswordViaEmail";
import ResetPassword from "./pages/ResetPassword";
import AdminDetails from "./pages/AdminDetails";
import TodoQuery from "./query/TodoQuery.jsx";

import { Headers, Register, Logins, ChangePasswords, UserDashboard, AdminDashboard, ForgotPassword, ResetPasswords } from "./component/authentication/pages";
import ProtectedRoute from "./component/authentication/utils/ProtectedRoute";

function App() {
  return (
    <>
      {/* <Todo /> */}
      {/* <hr /> */}
      {/* <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userDetail" element={<UserDetail />} />
        <Route path="userDetail/changePassword" element={<ChangePassword />} />
        <Route path="/forgotPassword" element={<ForgotPasswordViaEmail />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/adminDetail" element={<AdminDetails />} />
      </Routes> */}
      {/* <TodoQuery /> */}

      <Headers />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Logins />} />;
        <Route path="/login/forgotPassword" element={<ForgotPassword />} />
        <Route path="/login/resetPassword" element={<ResetPasswords />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/changePassword" element={<ChangePasswords />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

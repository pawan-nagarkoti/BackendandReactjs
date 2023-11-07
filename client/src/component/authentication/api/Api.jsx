import axios from "axios";

// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// axios.defaults.withCredentials = true;

const Axios = axios.create({
  // "Content-Type": "application/json",
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

export default Axios;

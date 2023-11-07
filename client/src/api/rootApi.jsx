import axios from "axios";

const Axios = axios.create({
  "Content-Type": "application/json",
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: false,
});

export default Axios;

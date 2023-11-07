import axios from "axios";
import Axios from "./Api";

export default async function getRequest(URL) {
  try {
    const response = await Axios.get(`/${URL}`);
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
}

export async function authenticatedRequest(URL, token) {
  try {
    const response = await Axios.get(`/${URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    let refresh = false;
    if (error.response.status === 401) {
      const response = await axios.post("http://localhost:8080/api/v1/users/refresh-token", {}, { withCredentials: true });
      refresh = true;
      if (response.status === 200) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data["token"]}`;
        return axios(error.config);
      }
    }
    refresh = false;
    throw Error(error.response.data.message);
  }
}

export async function authenticatePostData(URL, data, token) {
  try {
    const response = await Axios.post(`/${URL}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
}

export async function changeAvtarPic(URL, inputFile, token) {
  try {
    const response = await Axios.patch(`/${URL}`, inputFile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      "Content-Type": "multipart/form-data",
    });
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
}

export async function getSingleRequest(URL, payload) {
  try {
    const response = await Axios.get(`/${URL}/${payload}`);
    console.log(response);
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
}

export async function postRequest(URL, payload) {
  try {
    const response = await Axios.post(`/${URL}`, payload);
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
}

export async function patchRequest(URL, payload) {
  try {
    const response = await Axios.patch(`/${URL}`, payload);
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
}

export async function putRequest(URL, payload) {
  try {
    const response = await Axios.put(`/${URL}`, payload);
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
}

export async function deleteRequest(URL, payload) {
  try {
    const response = await Axios.delete(`${URL}/${payload}`);
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
}

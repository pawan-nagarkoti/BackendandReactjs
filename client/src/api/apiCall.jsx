import Axios from "./rootApi";
export default async function getRequest(URL) {
  try {
    const response = await Axios.get(`/${URL}`);
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

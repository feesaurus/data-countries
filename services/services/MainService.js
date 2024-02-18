import axios from "axios";

const api = `https://restcountries.com/v3.1`;

export async function getAllData() {
  try {
    const response = await axios.get(api + '/all');
    const data = response.data;
    return data
  } catch (err) {
    const error = err.response.data.message
  }
}

export async function getByName(name) {
  const result = { list: [],  status: undefined, error: undefined }
  try {
    const response = await axios.get(api + '/name' + `/${name}`);
    result.list = response.data;
    result.status = response.status
  } catch (err) {
    result.error = err.response.data.message;
    result.status = err.response.data.status;
  }
  return result
}

export async function getByRegion(region) {
  const result = { data: [],  status: undefined, error: undefined }
  try {
    const response = await axios.get(api + '/region' + `/${region}`);
    result.data = response.data;
    result.status = response.status
  } catch (err) {
    result.error = err.response.data.message;
    result.status = err.response.data.status;
  }
  return result;
}

export async function searchByName(search) {
  const result = { data: [],  status: undefined, error: "" }
  try {
    const response = await axios.get(api + '/name' + `/${search}` + '?fields=name');
    result.data = response.data;
    result.status = response.status
  } catch (err) {
    result.error = err.response.data.message;
    result.status = err.response.data.status;
  }
  return result;
}
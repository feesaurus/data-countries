import axios from "axios";

const api = `https://restcountries.com/v3.1`;

export async function getAllData() {
  const response = await axios.get(api + '/all');
  const data = response.data;

  if (response.status !== 200) {
    throw new Error('Failed')
  } else {
    return data
  }
}

export async function getByName(name) {
  const response = await axios.get(api + '/name' + `/${name}`);
  const data = response.data;

  if (response.status !== 200) {
    throw new Error('Failed')
  } else {
    return data
  }
}

export async function getByRegion(region) {
  const response = await axios.get(api + '/region' + `/${region}`);
  const data = response.data;

  if (response.status !== 200) {
    throw new Error('Failed')
  } else {
    return data
  }
}

export async function searchByName(search) {
  const response = await axios.get(api + '/name' + `/${search}` + '?fields=name');
  const data = response.data;

  if (response.status !== 200) {
    throw new Error('Failed')
  } else {
    return data
  }
}
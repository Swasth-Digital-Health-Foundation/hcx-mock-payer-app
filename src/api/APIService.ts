import axios from 'axios';
import { generateToken } from './KeycloakService';

const baseUrl = process.env.REACT_APP_HCX_BASE_URL;
const apiVersion = process.env.REACT_APP_HCX_API_VERSION;
const adminUsername = process.env.REACT_APP_HCX_ADMIN_USERNAME;
const adminPassword = process.env.REACT_APP_HCX_ADMIN_PASSWORD;

export const post = async (path: string, body: any, headers = {}, token="") => {
  if(token == "") token = await getAdminToken() as string;
  return axios({
    method: 'post',
    url: `${baseUrl}/api/${apiVersion}${path}`,
    data: body,
    headers:{
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers
    }
  })
}

export const postPath = async (path: string, body: any, headers = {}, token="") => {
  if(token == "") token = await getAdminToken() as string;
  return axios({
    method: 'post',
    url: path,
    data: body,
    headers:{
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers
    }
  })
}

export const get = async (path: any, body = {}, headers = {}) => {
  const token = await getAdminToken()
  return axios({
    method: 'get',
    url: `${baseUrl}/api/${path}`,
    data: body,
    headers:{
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers
    }
  })
}

export const getToken = async (path: any, body: any, headers = {}) => {
  return axios({
    method: 'post',
    url: `${baseUrl}${path}`,
    data: body,
    headers:{
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers
    }
  })
}

async function getAdminToken() {
  return await generateToken(adminUsername, adminPassword);
}



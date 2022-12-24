/* eslint-disable import/no-anonymous-default-export */
const key = "bayanPlatformAuthToken00231";

const storeToken = (token) => localStorage.setItem(key, token);

const getToken = () => "Bearer " + localStorage.getItem(key);

const removeToken = () => localStorage.removeItem(key);

export default {
  getToken,
  removeToken,
  storeToken,
};

import axios from "axios";

export const loginUser = async (email) => {
  const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {
    email,
  });
  return res;
};

export const registerUser = async (email, username) => {
  await axios.post(`${import.meta.env.VITE_SERVER_URL}/register`, {
    email,
    username,
  });
};

export const authUser = async (token) => {
  axios.defaults.headers.common["Authorization"] = `BEARER ${token}`;
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/authenticate`
  );
  return res;
};

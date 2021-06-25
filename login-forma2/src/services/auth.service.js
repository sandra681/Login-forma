import axios from "axios";
import { handleResponse, handleError } from "../api/apiUtils";
import authHeader from "../services/auth-header";

const API_URL = "http://127.0.0.1:8000/api/auth/";

const register = (name, email, password) => {
  return axios.post(
    API_URL + "register",
    {
      name,
      email,
      password,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

const login = (email, password) => {
  return axios
    .post(
      API_URL + "login",
      { email, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getUser = () => {
  return axios
    .get(API_URL + "user", {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
};

export default {
  register,
  login,
  logout,
  getUser,
};

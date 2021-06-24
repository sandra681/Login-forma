import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth";

const register = (name, email, password) => {
  return axios.post(API_URL + "register", {
    name: "Korisnik",
    email,
    password,
  });
};

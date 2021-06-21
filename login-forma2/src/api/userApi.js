import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://127.0.0.1:8000/api/auth/user";
// csonst token = localStorage.getItem("token");

export function getUser(token) {
  if (!token) {
    return null;
  }
  return fetch(baseUrl, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(handleResponse)
    .catch(handleError);
}


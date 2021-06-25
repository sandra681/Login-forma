import { handleError, handleResponse } from "./apiUtils";
import { useSelector } from "react-redux";

const baseUrl = "http://127.0.0.1:8000/api/auth/user";

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

import { handleError, handleResponse } from "./apiUtils";
import { axios } from "axios";

const baseUrl = "http://127.0.0.1:8000/api/auth/user";
const token = localStorage.getItem("token");

export async function getUser() {
  if (!token) {
    return null;
  }
  return fetch(baseUrl, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function isAdmin() {
  const currentUser = getUser();
  if (currentUser === null) return;
  if (currentUser.admin === 1) {
    return true;
  } else {
    return false;
  }
}

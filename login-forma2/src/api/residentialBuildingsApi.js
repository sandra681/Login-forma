import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://backend.test/api/homes/";

export function getHomes() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
export function getSomeHomes(num) {
  const url = baseUrl + num;
  return fetch(url).then(handleResponse).catch(handleError);
}

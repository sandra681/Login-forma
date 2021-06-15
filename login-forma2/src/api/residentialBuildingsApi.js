import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://127.0.0.1:8000/api/homes/";

export function getHomes() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
export function getSomeHomes(num) {
  const url = baseUrl + num;
  return fetch(url).then(handleResponse).catch(handleError);
}
export function deleteHome(home) {
  const url = baseUrl + home;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json", // Indicates the content
      "X-CSRF-TOKEN": document
        .querySelector('[name="csrf-token"]')
        .getAttribute("content"),
    },
  })
    .then((response) => {
      if (true) return response.status;
      throw new Error("Network response was not ok");
    })
    .catch(handleError);
}

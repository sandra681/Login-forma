import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://127.0.0.1:8000/api/home/";

// export function getHomes(sort = "name", order = "asc", num = "10") {
//   console.log(baseUrl + sort + "/" + order + "/" + num);
//   return fetch(baseUrl + sort + "/" + order + "/" + num)
//     .then(handleResponse)
//     .catch(handleError);
// }
export function getFilteredHomes(filter, sort, order, num) {
  if (filter === "") {
    return fetch(
      `http://127.0.0.1:8000/api/home/?sort=${sort}&order=${order}&num=${num}`
    )
      .then(handleResponse)
      .catch(handleError);
  }
  return fetch(
    `http://127.0.0.1:8000/api/home/?sort=${sort}&order=${order}&filter=${filter}&num=${num}`
  )
    .then(handleResponse)
    .catch(handleError);
}

export function getCategories() {
  console.log(baseUrl + "categories");
  return fetch(baseUrl + "categories")
    .then(handleResponse)
    .catch(handleError);
}
// export function getSomeHomes(num) {
//   const url = baseUrl + num;
//   return fetch(url).then(handleResponse).catch(handleError);
// }
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

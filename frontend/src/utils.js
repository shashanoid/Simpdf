import axios from "axios";

export const uploadService = {
  uploadFile,
};

const getCsrf = () => {
  const result =
    document.cookie &&
    document.cookie
      .split("; ")
      .reduce(
        (acc, cookie) =>
          acc ||
          (cookie.substring(0, "csrftoken".length + 1) === "csrftoken=" &&
            decodeURIComponent(cookie.substring("csrftoken=".length))),
        null
      );
  return result;
};

export { getCsrf };

function uploadFile(data) {
  return axios.post(`https://api.simpdf.com/upload`, data, {
    headers: {
      "X-CSRFToken": getCsrf(),
    },
  });
}

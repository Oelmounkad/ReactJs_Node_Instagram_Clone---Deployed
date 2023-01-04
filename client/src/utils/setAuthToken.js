import axios from "../config/axios-config";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.common["x-auth-token"];
  }
};

export default setAuthToken;

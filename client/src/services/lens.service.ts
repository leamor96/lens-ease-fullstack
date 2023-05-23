import axios from "axios";

const baseUrl = "http://localhost:3001/api/lens";

const getLensData = () => {
  return axios.get(baseUrl);
};

export { getLensData };

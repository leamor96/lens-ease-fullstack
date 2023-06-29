import axios from "axios";
import { LensFormData, LensProFormData } from "../@types";
import { API_URL } from "../env";

const formUrl = `${API_URL}/submit-form`;
const proFormUrl = `${API_URL}/submit-pro-form`;

const submitFormDataToServer = async (formData: LensFormData) => {
  const requestBody = {
    sphRight: formData.sphRight,
    cylRight: formData.cylRight,
    sphLeft: formData.sphLeft,
    cylLeft: formData.cylLeft,
  };


  try {
  return await axios.post(formUrl, requestBody);
  
  } catch (error) {
    throw new Error("Failed to submit form data to the server.");
  }
};

const submitProFormDataToServer = async (formData: LensProFormData) => {
  const requestBody = {
    sphRight: formData.sphRight,
    sphLeft: formData.sphLeft,
  };


  try {
  return await axios.post(proFormUrl, requestBody);
  
  } catch (error) {
    throw new Error("Failed to submit form data to the server.");
  }
};


export { submitFormDataToServer, submitProFormDataToServer };

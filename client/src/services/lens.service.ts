import { LensFormData, LensProFormData } from "../@types";
import axios from "../api/axios";


const submitFormDataToServer = async (formData: LensFormData) => {
  const requestBody = {
    sphRight: formData.sphRight,
    cylRight: formData.cylRight,
    sphLeft: formData.sphLeft,
    cylLeft: formData.cylLeft,
  };


  try {
  return await axios.post('/submit-form', requestBody);
  
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
  return await axios.post("/submit-pro-form", requestBody);
  
  } catch (error) {
    throw new Error("Failed to submit form data to the server.");
  }
};


export { submitFormDataToServer, submitProFormDataToServer };

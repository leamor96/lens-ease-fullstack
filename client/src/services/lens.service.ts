import axios from "axios";
import { LensFormData } from "../@types";

const baseUrl = "http://localhost:3001/api/submit-form";

const submitFormDataToServer = async (formData: LensFormData) => {
  const requestBody = {
    sphRight: formData.sphRight,
    cylRight: formData.cylRight,
    sphLeft: formData.sphLeft,
    cylLeft: formData.cylLeft,
  };


  try {
  return await axios.post(baseUrl, requestBody);
  
  } catch (error) {
    throw new Error("Failed to submit form data to the server.");
  }
};

export { submitFormDataToServer };

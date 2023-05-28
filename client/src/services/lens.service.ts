import axios from "axios";

const baseUrl = "http://localhost:3001/api/lenses";
const submitFormUrl = "http://localhost:3001/api/submit-form";

const getLensData = () => {
  return axios.get(baseUrl);
};

const submitFormDataToServer = async (formData: FormData) => {
  const sphRight = parseFloat(formData.get("sphRight") as string);
  const cylRight = parseFloat(formData.get("cylRight") as string);
  const sphLeft = parseFloat(formData.get("sphLeft") as string);
  const cylLeft = parseFloat(formData.get("cylLeft") as string);

  const rightEyePayload = {
    minusRange: sphRight < 0 ? sphRight : null,
    plusRange: sphRight > 0 ? sphRight : null,
    name: "Right Eye", // Adjust the name field based on your server's lens schema
    cyl: cylRight, // Adjust the field name for cylinder based on your server's lens schema
    // Include any other fields required by the server's lens schema for the right eye
  };

  const leftEyePayload = {
    minusRange: sphLeft < 0 ? sphLeft : null,
    plusRange: sphLeft > 0 ? sphLeft : null,
    name: "Left Eye", // Adjust the name field based on your server's lens schema
    cyl: cylLeft, // Adjust the field name for cylinder based on your server's lens schema
    // Include any other fields required by the server's lens schema for the left eye
  };

  try {
    // Send the right eye payload to the server
    const rightEyeResponse = await axios.post(submitFormUrl, rightEyePayload);
    // Handle the right eye response as needed

    // Send the left eye payload to the server
    const leftEyeResponse = await axios.post(submitFormUrl, leftEyePayload);
    // Handle the left eye response as needed

    // Return any relevant data or indicate success
    return { rightEyeResponse, leftEyeResponse };
  } catch (error) {
    // Handle errors
    throw new Error("Failed to submit form data to the server.");
  }
};

export { getLensData, submitFormDataToServer };

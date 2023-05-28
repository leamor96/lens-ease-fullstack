export const calculateLensOptions = (formData) => {
  const sphRight = parseFloat(formData.sphRight);
  const cylRight = parseFloat(formData.cylRight);
  const sphLeft = parseFloat(formData.sphLeft);
  const cylLeft = parseFloat(formData.cylLeft);

  const rightEyeOptions = {
    sph: sphRight,
    cyl: cylRight,
    // Additional calculated properties based on the right eye data
  };

  const leftEyeOptions = {
    sph: sphLeft,
    cyl: cylLeft,
    // Additional calculated properties based on the left eye data
  };

  const lensOptions = {
    rightEye: rightEyeOptions,
    leftEye: leftEyeOptions,
  };

  return lensOptions;
};

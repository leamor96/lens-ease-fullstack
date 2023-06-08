import { Lens } from "../db/models/lens.js";

export const calculateLensOptions = async (formData) => {
  const sphRight = parseFloat(formData.sphRight);
  const cylRight = parseFloat(formData.cylRight);
  const sphLeft = parseFloat(formData.sphLeft);
  const cylLeft = parseFloat(formData.cylLeft);

  console.log("start here");
  

  console.log(sphLeft,sphLeft,cylRight,cylLeft);
  

  try {
    const queryRight = {
      "sphRange.minus": { $lte: sphRight },
      "sphRange.plus": { $gte: sphRight },
      cylMax: { $lte: cylRight },
    };

    const queryLeft = {
      "sphRange.minus": { $lte: sphLeft },
      "sphRange.plus": { $gte: sphLeft },
      cylMax: { $lte: cylLeft },
    };

    const rightEyeLenses = await Lens.find(queryRight).sort({ price: 1 });
    const leftEyeLenses = await Lens.find(queryLeft).sort({ price: 1 });

   
   
    if (rightEyeLenses.length === 0 && leftEyeLenses.length === 0) {
      // No matching lenses found for both eyes
      return {
        rightEyeOptions: [],
        leftEyeOptions: [],
      };
    }

    return {
      rightEyeOptions: rightEyeLenses,
      leftEyeOptions: leftEyeLenses,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch lens options");
  }
};

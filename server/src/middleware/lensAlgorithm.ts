import { Lens } from "../db/models/lens.js";

export const calculateLensOptions = async (formData) => {
  const sphRight = parseFloat(formData.sphRight);
  const cylRight = parseFloat(formData.cylRight);
  const sphLeft = parseFloat(formData.sphLeft);
  const cylLeft = parseFloat(formData.cylLeft);

  try {
    const rightEyeLenses = await Lens.find({
      "sphRange.minus": { $lte: sphRight },
      "sphRange.plus": { $gte: sphRight },
      cylMax: { $lte: cylRight },
    }).sort({ price: 1 });

    const leftEyeLenses = await Lens.find({
      "sphRange.minus": { $lte: sphLeft },
      "sphRange.plus": { $gte: sphLeft },
      cylMax: { $lte: cylLeft },
    }).sort({ price: 1 });

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

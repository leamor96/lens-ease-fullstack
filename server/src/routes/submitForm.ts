import { Router } from "express";
import { calculateLensOptions } from "../middleware/lensAlgorithm.js"; 

const router = Router();

router.post("/", async (req, res) => {
  const formData = req.body;

  // Process the form data and perform necessary operations
  // ...

  // Perform your algorithm to determine the appropriate lens options based on the form data
  const lensOptions = await calculateLensOptions(formData);

  // Return the lens options to the client
  res.status(200).json(lensOptions);
});

export { router as submitFormRouter };
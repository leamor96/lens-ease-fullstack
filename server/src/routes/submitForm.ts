import { Request, Response } from "express";
import { Router } from "express";
import { calculateLensOptions } from "../middleware/lensAlgorithm.js";

const router = Router();

// POST request handler
router.post("/", async (req: Request, res: Response) => {
  try {
    const formData = req.body;

    //   // Perform your algorithm to determine the appropriate lens options based on the form data
    const lensOptions = await calculateLensOptions(formData);

    // Return the lens options to the client
    res.status(200).json({
      rightEyeOptions: lensOptions.rightEyeOptions,
      leftEyeOptions: lensOptions.leftEyeOptions,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export { router as submitFormRouter };

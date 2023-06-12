import { Request, Response } from "express";
import { Router } from "express";
import { calculateProOptions } from "../middleware/proLensAlgorithm.js";


const router = Router();

// POST request handler
router.post("/", async (req: Request, res: Response) => {
  try {
    const proFormData = req.body;

    //   // Perform your algorithm to determine the appropriate lens options based on the form data
    const proLensOptions = await calculateProOptions(proFormData);

    // Return the lens options to the client
    res.status(200).json({
      proFormData,
      proLensOptions: {
        rightEyeOptions: proLensOptions.rightEyeOptions,
        leftEyeOptions: proLensOptions.leftEyeOptions,
      },
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export { router as submitProFormRouter };

import { Router } from "express";
import { ProLens } from "../db/models/proLens.js";
import { validateToken } from "../middleware/validateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { Favorite } from "../db/models/favorite.js";

const router = Router();

// Get all the proLenses from the database
router.get("/", async (req, res) => {
  try {
    const proLenses = await ProLens.find({});
    res.status(200).json(proLenses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Get a single prolens by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const proLens = await ProLens.findById(id);
    if (!proLens) {
      return res.status(404).send("Lens not found");
    }
    res.status(200).json(proLens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Protected routes
// Create a new lens
router.post("/", validateToken, isAdmin, async (req, res) => {
  try {
    const newProLens = new ProLens(req.body);
    // Check if a lens with the same properties already exists
    const existingProLens = await ProLens.findOne({
      name: newProLens.name,
      lensType: newProLens.lensType,
      index: newProLens.index,
      diameter: newProLens.diameter,
      "sphRange.minus": newProLens.sphRange.minus,
      "sphRange.plus": newProLens.sphRange.plus,
      adjustmentHeight: newProLens.adjustmentHeight,
      coating: newProLens.coating,
      price: newProLens.price,
    });

    if (existingProLens) {
      res.status(400).json({ message: "Lens already exists" });
    } else {
      await newProLens.save();
      res.status(201).json(newProLens);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Update a proLens by ID
router.put("/:id", validateToken, isAdmin, async (req, res) => {
  try {
    const proLensId = req.params.id;

    const updatedLens = await ProLens.findByIdAndUpdate(proLensId, req.body, {
      new: true,
    });
    res.json(updatedLens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete a proLens by ID
router.delete("/:id", validateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLens = await ProLens.findByIdAndDelete(id);
    if (!deletedLens) {
      return res.status(404).send("Lens not found");
    }
    res.status(200).json(deletedLens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Toggle favorite status of a proLens for the authenticated user
router.post("/:id/favorite", validateToken, async (req, res) => {
  try {
    const userId = req.userId; // Retrieve the user ID from req.userId
    const proLensId = req.params.id;
    

    // Find the favorite entry for the user and lens
    const favorite = await Favorite.findOne({ user: userId, proLens: proLensId });

    if (!favorite) {
      // Favorite entry does not exist, create it
      await Favorite.create({ user: userId, proLens: proLensId });
    } else {
      // Favorite entry exists, delete it
      await Favorite.findByIdAndDelete(favorite._id);
    }

    res.status(200).send("Favorite status updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export { router as proLensesRouter };

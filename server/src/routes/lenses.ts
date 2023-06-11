import { Router } from "express";
import { Lens } from "../db/models/lens.js";
import { validateToken } from "../middleware/validateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { Favorite } from "../db/models/favorite.js";
const router = Router();

// Get all the lenses from the database
router.get("/", async (req, res) => {
  try {
    const lenses = await Lens.find({});
    res.status(200).json(lenses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Get a single lens by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const lens = await Lens.findById(id);
    if (!lens) {
      return res.status(404).send("Lens not found");
    }
    res.status(200).json(lens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Protected routes
// Create a new lens
router.post("/", validateToken, isAdmin, async (req, res) => {
  try {
    const newLens = new Lens(req.body);
    // Check if a lens with the same properties already exists
    const existingLens = await Lens.findOne({
      name: newLens.name,
      category: newLens.category,
      index: newLens.index,
      diameter: newLens.diameter,
      "sphRange.minus": newLens.sphRange.minus,
      "sphRange.plus": newLens.sphRange.plus,
      cylMax: newLens.cylMax,
      coating: newLens.coating,
      price: newLens.price,
    });

    if (existingLens) {
      res.status(400).json({ message: "Lens already exists" });
    } else {
      await newLens.save();
      res.status(201).json(newLens);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Update a lens by ID
router.put("/:id", validateToken, isAdmin, async (req, res) => {
  try {
    const lensId = req.params.id;

    const updatedLens = await Lens.findByIdAndUpdate(lensId, req.body, {
      new: true,
    });
    res.json(updatedLens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete a lens by ID
router.delete("/:id", validateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLens = await Lens.findByIdAndDelete(id);
    if (!deletedLens) {
      return res.status(404).send("Lens not found");
    }
    res.status(200).json(deletedLens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Toggle favorite status of a lens for the authenticated user
router.post("/:id/favorite", validateToken, async (req, res) => {
  try {
    const userId = req.userId; // Retrieve the user ID from req.userId
    const lensId = req.params.id;

    // Find the favorite entry for the user and lens
    const favorite = await Favorite.findOne({ user: userId, lens: lensId });

    if (!favorite) {
      // Favorite entry does not exist, create it
      await Favorite.create({ user: userId, lens: lensId });
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

export { router as lensesRouter };

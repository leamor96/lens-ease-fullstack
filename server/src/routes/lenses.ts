import { Router } from "express";
import { Lens } from "../db/models/lens.js";
import { validateToken } from "../middleware/validateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { Favorite } from "../db/models/favorite.js";
import { User } from "../db/models/user.js";
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
    console.log("lensID ", lensId);

    const updatedLens = await Lens.findByIdAndUpdate(lensId, req.body, {
      new: true,
    });
    console.log("updatedLens ", updatedLens);
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
router.post("/:userId/favorite/:lensId", validateToken, async (req, res) => {
  try {
    const userId = req.params.userId; // Retrieve the user ID from req.userId
    const lensId = req.params.lensId;

    // Find the favorite entry for the user and lens
    const user = await User.findById(userId);
    const lens = await Lens.findById(lensId);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const lensExists = user.favoritesLens.find((e) => e.toString() === lensId);

    if (lensExists) {
      return res.status(422).send("This Exists!");
    }

   user.favoritesLens.push(lens);
    await user.save();

    res.status(200).send("Favorite status updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Get all favorite lenses for the authenticated user
router.get("/:userId/favorites", validateToken, async (req, res) => {
  try {
    const userId = req.params.id; // Retrieve the user ID from req.userId

    // Find all favorite entries for the user
    const favorites = await Favorite.find({ user: userId });
    console.log("favorites" + favorites);

    // Retrieve the lens IDs from the favorite entries
    const lensIds = favorites.map((favorite) => favorite.lens);

    // Fetch the lens details for the retrieved IDs
    const lenses = await Lens.find({ _id: { $in: lensIds } });
    console.log("lenses" + lenses);

    res.status(200).json(lenses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export { router as lensesRouter };

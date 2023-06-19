import { Router } from "express";
import { ProLens } from "../db/models/proLens.js";
import { validateToken } from "../middleware/validateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { User } from "../db/models/user.js";

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
//בלי השינויים 
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

// Toggle favorite status of a lens for the authenticated user
router.post("/:userId/favorite/:proLensId", validateToken, async (req, res) => {
  try {
    const userId = req.params.userId; // Retrieve the user ID from req.userId
    const proLensId = req.params.proLensId;

    // Find the favorite entry for the user and lens
    const user = await User.findById(userId);
    const proLens = await ProLens.findById(proLensId);

    if (!user) {
      return res.status(404).send("User not found.");
    }
    const proLensExists = user.favoritesProLens.find(
      (e) => e.toString() === proLensId
    );
    if (proLensExists) {
      return res.status(422).send("This Exists!");
    }
     user.favoritesProLens.push(proLens);
     await user.save();

    res.status(200).send("Favorite status updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Get all favorite lenses for the authenticated user
router.get("/:id/favorites", validateToken, async (req, res) => {
  try {
     const id = req.params.id; // Retrieve the user ID from req.userId

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).send("User not found");
      }

    // Find all favorite entries for the user
    //const favoritesProLens = await Favorite.find({ user: id });

    // Retrieve the lens IDs from the favorite entries
    //const proLensIds = favoritesProLens.map((favorite) => favorite.proLens);

    // Fetch the lens details for the retrieved IDs
    //const proLenses = await ProLens.find({ _id: { $in: proLensIds } });

    res.status(200).json(user.favoritesProLens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.delete(
  "/:userId/delete-from-pro-favorite/:proLensId",
  validateToken,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const proLensId = req.params.proLensId;

      const user = await User.findById(userId);
      console.log(user);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const proLens = await ProLens.findById(proLensId);
     
      if (!proLens) {
        return res.status(404).send("Lens not found");
      }

      const proLensExists = user.favoritesProLens.find(
        (e) => e._id.toString() === proLensId
      );

      if (proLensExists) {
        user.favoritesProLens.pull(proLensExists);
      }
      await user.save();
      return res.status(200).send("Lens removed from favorites successfully");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

export { router as proLensesRouter };

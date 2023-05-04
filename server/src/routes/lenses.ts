import { Router } from "express";
import { Lens } from "../db/models/lens.js";
import { validateToken } from "../middleware/validateToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
const router = Router();

//get all the lenses from db
router.get("/", async (req, res) => {
  try {
    const lenses = await Lens.find({});
    res.status(200).json(lenses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
})

//get a single lens by ID
router.get("/:id",async (req,res) => {
  const {id}=req.params;
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
})

//protected routes
//create a new lens
router.post("/",validateToken,isAdmin, async (req, res) => {
  try {
    const newLens = new Lens(req.body);
    // check if a lens with the same properties already exists
    const existingLens = await Lens.findOne({
      name: newLens.name,
      index: newLens.index,
      diameter: newLens.diameter,
      minusRange: newLens.minusRange,
      plusRange: newLens.plusRange,
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
// UPDATE a lens by ID
router.put("/:id",validateToken, isAdmin, async (req, res) => {
  try {
    const updatedLens = await Lens.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(updatedLens);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// DELETE a lens by ID
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

export {router as lensesRouter};
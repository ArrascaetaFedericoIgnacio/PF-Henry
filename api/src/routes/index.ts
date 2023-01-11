import { Router } from "express";
import { getModelForClass } from "@typegoose/typegoose";
import { Role } from "../data/models/Role";

import category from "../routes/Routes/categoriesRoutes";
import products from "../routes/Routes/productRoutes";
import user from "../routes/Routes/userRoutes";

const RoleModel = getModelForClass(Role);
const router = Router();

router.use("/products", products);
router.use("/users", user);
router.use("/categories", category);

////////////////////////////////////////////////////////////////////////////
router.get("/roles", async (req, res) => {
  try {
    const roles = await RoleModel.find();
    res.json(roles);
  } catch (error) {
    res.json(error);
  }
});

router.post("/roles", async (req, res) => {
  try {
    const role = new RoleModel(req.body);
    await role.save();
    res.json(role);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;

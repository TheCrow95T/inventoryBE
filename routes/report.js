import express from "express";
import {
  salesByCategory,
  salesByProductInCategory,
  purchaseByCategory,
  purchaseByProductInCategory,
} from "../controllers/reportController.js";
const router = express.Router();

// sales by category for the year
router.post("/sales/category", salesByCategory);
// sales by product in selected category for the year
router.post("/sales/category/:id", salesByProductInCategory);
// purchases by category for the year
router.post("/purchases/category", purchaseByCategory);
// purchases by product in selected category for the year
router.post("/purchases/category/:id", purchaseByProductInCategory);

export default router;

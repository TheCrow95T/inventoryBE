import express from "express";
import {
  recentFiveProduct,
  recentFiveSales,
  topFiveSales,
  totalCategory,
  totalProduct,
} from "../controllers/dashboardController.js";
const router = express.Router();

// total category (Count)
router.get("/category/total", totalCategory);
// total product (Count)
router.get("/product/total", totalProduct);
// top 5 sales in the year
router.get("/sales/top", topFiveSales);
// latest 5 sales
router.get("/sales/latest", recentFiveSales);
// recent 5 product added
router.get("/product/latest", recentFiveProduct);

export default router;

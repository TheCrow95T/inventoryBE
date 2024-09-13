import express from "express";
import {
    createCategories,
    createProduct,
    editCategories,
    editProduct,
    listCategories,
    listProducts,
    postPurchase,
    postSales,
    purchasesListByPage,
    reversePurchase,
    reverseSales,
    salesListByPage,
} from "../controllers/operationController.js";
const router = express.Router();

// show all categories
router.get("/category", listCategories);
// create categories
router.post("/category", createCategories);
// edit categories
router.put("/category", editCategories);
// show all products
router.get("/product", listProducts);
// create product
router.post("/product", createProduct);
// edit product
router.put("/product", editProduct);
// show 50 purchase (pagination)
router.get("/purchases", purchasesListByPage);
// post purchase transaction
router.post("/purchases/post", postPurchase);
// reverse purchase transaction
router.post("/purchases/reverse", reversePurchase);
// show 50 sales (pagination)
router.get("/sales", salesListByPage);
// post sales transaction
router.post("/sales/post", postSales);
// reverse sales transaction
router.post("/sales/reverse", reverseSales);

export default router;

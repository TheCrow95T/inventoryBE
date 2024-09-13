import express from "express";
import {
  createGroup,
  createUser,
  listGroup,
  listUser,
  editGroup,
  editUser,
  deleteGroup,
  deleteUser,
  changePassword,
} from "../controllers/adminController.js";
const router = express.Router();

// create new group
router.post("/group/create", createGroup);

// create new user
router.post("/user/create", createUser);

// list group
router.get("/group", listGroup);

// list user
router.get("/user", listUser);

// edit group
router.put("/group", editGroup);

// edit user
router.put("/user", editUser);

// delete group
router.delete("/group", deleteGroup);

// delete user
router.delete("/user", deleteUser);

// change password
router.put("/user/pass/:id", changePassword);

export default router;

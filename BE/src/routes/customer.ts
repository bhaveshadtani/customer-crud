import express from "express";
import {
  addEditCustomer,
  deleteCustomer,
  listCustomer,
} from "../controllers/customer";
import isVerified from "../middleware/isVerified";

const router = express.Router();

router.post("/add-edit-customer", isVerified, addEditCustomer);
router.post("/delete-customer", isVerified, deleteCustomer);
router.post("/customer-list", isVerified, listCustomer);

export default router;
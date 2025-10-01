import { Request, Response } from "express";
import Customer from "../models/Customer";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

// Add or Edit Customer
export const addEditCustomer = async (req: Request, res: Response) => {
  try {
    const { id, name, address, phone } = req.body;
    if (!name || !address || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userId = (req as AuthenticatedRequest).user.id; // type assertion
    let customer;
    if (id) {
      customer = await Customer.findByIdAndUpdate(
        id,
        { name, address, phone, userId },
        { new: true }
      );
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
    } else {
      customer = await Customer.create({ name, address, phone, userId });
    }
    return res.status(200).json({ customer });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete Customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id, confirm } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Customer id required" });
    }
    if (!confirm) {
      return res.status(400).json({ message: "Confirmation required" });
    }
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// List Customers with Pagination
export const listCustomer = async (req: Request, res: Response) => {
  try {
    let { page = 1, limit = 10 } = req.body;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    const userId = (req as AuthenticatedRequest).user.id;
    const customers = await Customer.find({ userId }).skip(skip).limit(limit);
    const total = await Customer.countDocuments({ userId });
    return res.status(200).json({ customers, total, page, limit });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

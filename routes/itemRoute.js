import express from "express";
import { fetchItems, deleteItem, updateItem, addItem } from "../controllers/itemController.js";

const router = express.Router();

router.get('/', fetchItems);
router.delete('/:id_item', deleteItem);
router.put('/:id_item', updateItem);
router.post('/', addItem);

export default router;
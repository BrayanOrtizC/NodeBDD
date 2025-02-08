import express from "express";
import {
  fetchProductos,
  fetchProductoById,
  addProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/productoController.js";

const router = express.Router();

// Ruta para obtener todos los productos
router.get("/", fetchProductos);

// Ruta para obtener un producto por ID
router.get("/:id_producto", fetchProductoById);

// Ruta para agregar un nuevo producto
router.post("/", addProducto);

// Ruta para actualizar un producto por ID
router.put("/:id_producto", updateProducto);

// Ruta para eliminar un producto por ID
router.delete("/:id_producto", deleteProducto);

export default router;

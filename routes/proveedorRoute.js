import express from "express";
import { fetchProveedores, deleteProveedor, updateProveedor, addProveedor } from "../controllers/proveedorController.js";

const router = express.Router();

// Ruta para obtener todos los proveedores
router.get("/", fetchProveedores);

// Ruta para eliminar un proveedor por ID
router.delete("/:id_proveedor", deleteProveedor);

// Ruta para actualizar un proveedor por ID
router.put("/:id_proveedor", updateProveedor);

// Ruta para agregar un nuevo proveedor
router.post("/", addProveedor);

export default router;

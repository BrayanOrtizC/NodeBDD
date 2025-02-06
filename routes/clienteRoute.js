import express from "express";
import { fetchClientes, deleteCliente, updateCliente, addCliente } from "../controllers/clienteController.js";

const router = express.Router();

// Ruta para obtener todos los clientes
router.get('/', fetchClientes);

// Ruta para eliminar un cliente por cédula
router.delete('/:cc_cliente', deleteCliente);

// Ruta para actualizar un cliente por cédula
router.put('/:cc_cliente', updateCliente);

// Ruta para agregar un nuevo cliente
router.post('/', addCliente);

export default router;

import express from "express";
import { fetchFacturas, fetchFacturaById, addFactura } from "../controllers/facturaController.js";

const router = express.Router();

// Obtener todas las facturas
router.get("/", fetchFacturas);

// Obtener una factura por ID
router.get("/:id", fetchFacturaById);

// Crear una nueva factura
router.post("/", addFactura);

export default router;


/*
const express = require("express");
const router = express.Router();
const facturaController = require("../controllers/facturaController");

// Obtener todas las facturas
router.get("/", facturaController.getAllFacturas);

// Obtener una factura por ID
router.get("/:id", facturaController.getFacturaById);

// Crear una nueva factura
router.post("/", facturaController.createFactura);

// Actualizar una factura por ID
router.put("/:id", facturaController.updateFactura);

// Eliminar una factura por ID
router.delete("/:id", facturaController.deleteFactura);

module.exports = router;
*/
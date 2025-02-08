import express from "express";
import { crearFactura} from "../controllers/facturaController.js";

const router = express.Router();

// Endpoint para crear factura con ítems
router.post("/", crearFactura);

export default router;

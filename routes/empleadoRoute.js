import express from "express";
import { fetchEmpleados, deleteEmpleado, updateEmpleado, addEmpleado } from "../controllers/empleadoController.js";

const router = express.Router();

router.get("/", fetchEmpleados);
router.delete("/:cc_empleado", deleteEmpleado);
router.put("/:cc_empleado", updateEmpleado);
router.post("/", addEmpleado);

export default router;

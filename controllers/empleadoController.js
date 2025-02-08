import empleadoModel from "../models/empleadoModels.js";

// Obtener todos los empleados
export const fetchEmpleados = async (req, res) => {
  try {
    const empleados = await empleadoModel.getEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar empleado por cédula
export const deleteEmpleado = async (req, res) => {
  const { cc_empleado } = req.params;
  try {
    const result = await empleadoModel.deleteEmpleadoByCC(cc_empleado);
    if (result === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.status(200).json({ message: "Empleado eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    res.status(500).json({ error: "Error al eliminar el empleado" });
  }
};

// Actualizar empleado por cédula
export const updateEmpleado = async (req, res) => {
  const { cc_empleado } = req.params;
  const updatedData = req.body;
  try {
    const result = await empleadoModel.updateEmpleadoByCC(cc_empleado, updatedData);
    if (result === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.status(200).json({ message: "Empleado actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    res.status(500).json({ error: "Error al actualizar el empleado" });
  }
};

// Insertar un nuevo empleado
export const addEmpleado = async (req, res) => {
  const empleado = req.body;
  try {
    const existingEmpleado = await empleadoModel.getEmpleadoByCC(empleado.cc_empleado);
    if (existingEmpleado) {
      return res.status(400).json({ message: "El empleado ya existe" });
    }

    const result = await empleadoModel.insertEmpleado(empleado);
    if (result === 1) {
      res.status(201).json({ message: "Empleado agregado exitosamente" });
    } else {
      res.status(500).json({ error: "Error al agregar el empleado" });
    }
  } catch (error) {
    console.error("Error al agregar el empleado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default { fetchEmpleados, deleteEmpleado, updateEmpleado, addEmpleado };

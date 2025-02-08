import proveedorModels from "../models/proveedorModels.js";

// Obtener todos los proveedores
export const fetchProveedores = async (req, res) => {
  try {
    const proveedores = await proveedorModels.getProveedores();
    res.status(200).json(proveedores);
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar proveedor por ID
export const deleteProveedor = async (req, res) => {
  const { id_proveedor } = req.params;
  try {
    const result = await proveedorModels.deleteProveedorById(id_proveedor);
    if (result === 0) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.status(200).json({ message: "Proveedor eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    res.status(500).json({ error: "Error al eliminar proveedor" });
  }
};

// Actualizar proveedor por ID
export const updateProveedor = async (req, res) => {
  const { id_proveedor } = req.params;
  const updatedData = req.body;
  try {
    const result = await proveedorModels.updateProveedorById(id_proveedor, updatedData);
    if (result === 0) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.status(200).json({ message: "Proveedor actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    res.status(500).json({ error: "Error al actualizar proveedor" });
  }
};

// Insertar un nuevo proveedor
export const addProveedor = async (req, res) => {
  const { id_proveedor, nombre_proveedor, numero_proveedor } = req.body;
  try {
    const existingProveedor = await proveedorModels.getProveedorById(id_proveedor);
    if (existingProveedor) {
      return res.status(400).json({ message: "El proveedor con este ID ya existe" });
    }
    const result = await proveedorModels.insertProveedor({ id_proveedor, nombre_proveedor, numero_proveedor });
    if (result === 1) {
      res.status(201).json({ message: "Proveedor agregado exitosamente" });
    } else {
      res.status(500).json({ error: "Error al agregar proveedor" });
    }
  } catch (error) {
    console.error("Error al agregar proveedor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default { fetchProveedores, deleteProveedor, updateProveedor, addProveedor };

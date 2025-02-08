import itemModels from "../models/itemModels.js";

export const fetchItems = async (req, res) => {
  try {
    const items = await itemModels.getItems();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error al obtener ítems:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const deleteItem = async (req, res) => {
  const { id_item } = req.params;
  try {
    const result = await itemModels.deleteItemByID(id_item);
    if (result === 0) {
      return res.status(404).json({ message: "Ítem no encontrado" });
    }
    res.status(200).json({ message: "Ítem eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el ítem:", error);
    res.status(500).json({ error: "Error al eliminar el ítem" });
  }
};

export const updateItem = async (req, res) => {
  const { id_item } = req.params;
  const updatedData = req.body;
  try {
    const result = await itemModels.updateItemByID(id_item, updatedData);
    if (result === 0) {
      return res.status(404).json({ message: "Ítem no encontrado" });
    }
    res.status(200).json({ message: "Ítem actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el ítem:", error);
    res.status(500).json({ error: "Error al actualizar el ítem" });
  }
};

export const addItem = async (req, res) => {
  const { nombre_item, precio, stock, categoria } = req.body;
  try {
    const result = await itemModels.insertItem({ nombre_item, precio, stock, categoria });
    if (result === 1) {
      res.status(201).json({ message: "Ítem agregado exitosamente" });
    } else {
      res.status(500).json({ error: "Error al agregar el ítem" });
    }
  } catch (error) {
    console.error("Error al agregar el ítem:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
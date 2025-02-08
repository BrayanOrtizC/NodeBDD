import productoModels from "../models/productoModels.js";

// Obtener todos los productos
export const fetchProductos = async (req, res) => {
  try {
    const productos = await productoModels.getProductos();
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un producto por ID
export const fetchProductoById = async (req, res) => {
  const { id_producto } = req.params;
  try {
    const producto = await productoModels.getProductoById(id_producto);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Insertar un nuevo producto
export const addProducto = async (req, res) => {
  const productoData = req.body;
  try {
    const result = await productoModels.insertProducto(productoData);
    if (result === 1) {
      res.status(201).json({ message: "Producto agregado exitosamente" });
    } else {
      res.status(500).json({ error: "Error al agregar el producto" });
    }
  } catch (error) {
    console.error("Error al agregar producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar un producto por ID
export const updateProducto = async (req, res) => {
  const { id_producto } = req.params;
  const updatedData = req.body;
  try {
    const result = await productoModels.updateProducto(id_producto, updatedData);
    if (result === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar un producto por ID
export const deleteProducto = async (req, res) => {
  const { id_producto } = req.params;
  try {
    const result = await productoModels.deleteProducto(id_producto);
    if (result === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default {
  fetchProductos,
  fetchProductoById,
  addProducto,
  updateProducto,
  deleteProducto,
};

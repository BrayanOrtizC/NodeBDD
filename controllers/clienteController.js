import productModels from "../models/clienteModels.js"

export const fetchProducts = async (req, res) => {
  try {
    const products = await productModels.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default {fetchProducts};

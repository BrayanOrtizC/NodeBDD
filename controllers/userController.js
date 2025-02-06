import userModels from "../models/userModels.js"

export const fetchUsers = async (req, res) => {
  try {
    const users = await userModels.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default {fetchUsers};

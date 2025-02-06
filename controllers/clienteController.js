import clienteModels from "../models/clienteModels.js";

// Obtener todos los clientes
export const fetchClientes = async (req, res) => {
  try {
    const clientes = await clienteModels.getClientes();
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar cliente por cédula
export const deleteCliente = async (req, res) => {
  const { cc_cliente } = req.params; // Obtener cédula desde los parámetros de la URL
  try {
    const result = await clienteModels.deleteClienteByCC(cc_cliente);
    if (result === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};

// Actualizar cliente por cédula
export const updateCliente = async (req, res) => {
  const { cc_cliente } = req.params; // Obtener cédula desde los parámetros de la URL
  console.log("Cédula recibida para actualización:", cc_cliente); // Depuración
  const updatedData = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const result = await clienteModels.updateClienteByCC(cc_cliente, updatedData);
    if (result === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    res.status(200).json({ message: "Cliente actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

export default { fetchClientes, deleteCliente, updateCliente };

// Insertar un nuevo cliente
export const addCliente = async (req, res) => {
  const { cc_cliente, nombre_cliente, telefono_cliente, direccion_cliente, correo_cliente, id_tienda } = req.body;

  try {
    // Verificamos si ya existe un cliente con la misma cédula
    const existingCliente = await clienteModels.getClienteByCC(cc_cliente);
    if (existingCliente) {
      return res.status(400).json({ message: "El cliente con esta cédula ya existe" });
    }

    // Llamamos al modelo para insertar el nuevo cliente
    const result = await clienteModels.insertCliente({ cc_cliente, nombre_cliente, telefono_cliente, direccion_cliente, correo_cliente, id_tienda });

    if (result === 1) { // 1 fila afectada significa que el cliente se insertó exitosamente
      res.status(201).json({ message: "Cliente agregado exitosamente" });
    } else {
      res.status(500).json({ error: "Error al agregar el cliente" });
    }
  } catch (error) {
    console.error("Error al agregar el cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

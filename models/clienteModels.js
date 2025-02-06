import { sql, poolConnect } from "../config/dbconfig.js";

// Obtener todos los clientes
const getClientes = async () => {
  try {
    const pool = await poolConnect; // Espera la conexión
    const request = pool.request(); // Usa el pool para hacer la consulta
    const result = await request.query('SELECT * FROM Cliente_001');
    console.table(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener clientes:", err);
    throw err;
  }
};

// Eliminar cliente por cédula
const deleteClienteByCC = async (cc_cliente) => {
  try {
    const pool = await poolConnect; // Espera la conexión
    const request = pool.request(); // Usa el pool para hacer la consulta

    // Usamos parámetros seguros para evitar SQL Injection
    request.input("cc_cliente", sql.VarChar, cc_cliente); 

    const result = await request.query("DELETE FROM Cliente_001 WHERE cc_cliente = @cc_cliente");

    return result.rowsAffected[0]; // Retorna el número de filas afectadas
  } catch (err) {
    console.error("Error al eliminar cliente:", err);
    throw err;
  }
};


// Actualizar cliente por cédula
const updateClienteByCC = async (cc_cliente, cliente) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();

    request.input("cc_cliente", sql.VarChar, cc_cliente);
    request.input("nombre_cliente", sql.VarChar, cliente.nombre_cliente);
    request.input("telefono_cliente", sql.VarChar, cliente.telefono_cliente);
    request.input("direccion_cliente", sql.VarChar, cliente.direccion_cliente);
    request.input("correo_cliente", sql.VarChar, cliente.correo_cliente);
    request.input("id_tienda", sql.VarChar, cliente.id_tienda);

    const query = `
      UPDATE Cliente_001 
      SET 
        nombre_cliente = @nombre_cliente,
        telefono_cliente = @telefono_cliente,
        direccion_cliente = @direccion_cliente,
        correo_cliente = @correo_cliente,
        id_tienda = @id_tienda
      WHERE cc_cliente = @cc_cliente
    `;

    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al actualizar cliente:", err);
    throw err;
  }
};

// Insertar un nuevo cliente
const insertCliente = async (cliente) => {
  try {
    const pool = await poolConnect; // Espera la conexión
    const request = pool.request(); // Usa el pool para hacer la consulta

    // Usamos parámetros para evitar SQL Injection
    request.input("cc_cliente", sql.VarChar, cliente.cc_cliente);
    request.input("nombre_cliente", sql.VarChar, cliente.nombre_cliente);
    request.input("telefono_cliente", sql.VarChar, cliente.telefono_cliente);
    request.input("direccion_cliente", sql.VarChar, cliente.direccion_cliente);
    request.input("correo_cliente", sql.VarChar, cliente.correo_cliente);
    request.input("id_tienda", sql.VarChar, cliente.id_tienda);

    const query = `
      INSERT INTO Cliente_001 (cc_cliente, nombre_cliente, telefono_cliente, direccion_cliente, correo_cliente, id_tienda)
      VALUES (@cc_cliente, @nombre_cliente, @telefono_cliente, @direccion_cliente, @correo_cliente, @id_tienda)
    `;

    const result = await request.query(query);
    return result.rowsAffected[0]; // Si result es 1, significa que se insertó un cliente
  } catch (err) {
    console.error("Error al insertar cliente:", err);
    throw err;
  }
};

// Obtener un cliente por cédula (para verificar si existe antes de insertarlo)
const getClienteByCC = async (cc_cliente) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("cc_cliente", sql.VarChar, cc_cliente);

    const result = await request.query("SELECT * FROM Cliente_001 WHERE cc_cliente = @cc_cliente");
    return result.recordset[0]; // Retorna el cliente si existe, o undefined si no
  } catch (err) {
    console.error("Error al obtener cliente:", err);
    throw err;
  }
};

export default { getClientes, deleteClienteByCC, updateClienteByCC, insertCliente, getClienteByCC };



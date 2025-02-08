import { sql, poolConnect } from "../config/dbconfig.js";

// Obtener todos los proveedores
const getProveedores = async () => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    const result = await request.query("SET XACT_ABORT ON SELECT * FROM Proveedor");
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener proveedores:", err);
    throw err;
  }
};

// Eliminar proveedor por ID
const deleteProveedorById = async (id_proveedor) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("id_proveedor", sql.Int, id_proveedor);
    const result = await request.query("SET XACT_ABORT ON DELETE FROM Proveedor WHERE id_proveedor = @id_proveedor");
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al eliminar proveedor:", err);
    throw err;
  }
};

// Actualizar proveedor por ID
const updateProveedorById = async (id_proveedor, proveedor) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();

    request.input("id_proveedor", sql.Int, id_proveedor);
    request.input("nombre_proveedor", sql.VarChar, proveedor.nombre_proveedor);
    request.input("numero_proveedor", sql.VarChar, proveedor.numero_proveedor);

    const query = `
      SET XACT_ABORT ON
      UPDATE Proveedor 
      SET nombre_proveedor = @nombre_proveedor,
          numero_proveedor = @numero_proveedor
      WHERE id_proveedor = @id_proveedor
    `;

    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al actualizar proveedor:", err);
    throw err;
  }
};

// Insertar un nuevo proveedor
const insertProveedor = async (proveedor) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();

    request.input("id_proveedor", sql.Int, proveedor.id_proveedor);
    request.input("nombre_proveedor", sql.VarChar, proveedor.nombre_proveedor);
    request.input("numero_proveedor", sql.VarChar, proveedor.numero_proveedor);

    const query = `
      SET XACT_ABORT ON
      INSERT INTO Proveedor (id_proveedor, nombre_proveedor, numero_proveedor)
      VALUES (@id_proveedor, @nombre_proveedor, @numero_proveedor)
    `;

    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al insertar proveedor:", err);
    throw err;
  }
};

// Obtener un proveedor por ID
const getProveedorById = async (id_proveedor) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("id_proveedor", sql.Int, id_proveedor);
    const result = await request.query("SET XACT_ABORT ON SELECT * FROM Proveedor WHERE id_proveedor = @id_proveedor");
    return result.recordset[0];
  } catch (err) {
    console.error("Error al obtener proveedor:", err);
    throw err;
  }
};

export default { getProveedores, deleteProveedorById, updateProveedorById, insertProveedor, getProveedorById };

import { sql, poolConnect } from "../config/dbconfig.js";

// Obtener todos los ítems
const getItems = async () => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    const result = await request.query('SET XACT_ABORT ON; SELECT * FROM Items_001');
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener ítems:", err);
    throw err;
  }
};

// Eliminar ítem por número de línea
const deleteItemByLinea = async (num_linea) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("num_linea", sql.Int, num_linea);
    const result = await request.query("SET XACT_ABORT ON; DELETE FROM Items_001 WHERE num_linea = @num_linea");
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al eliminar ítem:", err);
    throw err;
  }
};

// Actualizar un ítem por número de línea
const updateItemByLinea = async (num_linea, item) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();

    request.input("num_linea", sql.Int, num_linea);
    request.input("id_factura", sql.VarChar, item.id_factura);
    request.input("id_producto", sql.VarChar, item.id_producto);
    request.input("cantidad", sql.Int, item.cantidad);
    request.input("precio", sql.Decimal(10, 2), item.precio);
    request.input("importe", sql.Decimal(10, 2), item.importe);
    request.input("id_tienda", sql.VarChar, item.id_tienda);

    const query = `SET XACT_ABORT ON;
      UPDATE Items_001
      SET id_factura = @id_factura, id_producto = @id_producto, cantidad = @cantidad, 
          precio = @precio, importe = @importe, id_tienda = @id_tienda
      WHERE num_linea = @num_linea`;

    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al actualizar ítem:", err);
    throw err;
  }
};

// Insertar un nuevo ítem
const insertItem = async (item) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();

    request.input("id_factura", sql.VarChar, item.id_factura);
    request.input("id_producto", sql.VarChar, item.id_producto);
    request.input("cantidad", sql.Int, item.cantidad);
    request.input("precio", sql.Decimal(10, 2), item.precio);
    request.input("importe", sql.Decimal(10, 2), item.importe);
    request.input("id_tienda", sql.VarChar, item.id_tienda);

    const query = `SET XACT_ABORT ON;
      INSERT INTO Items_001 (id_factura, id_producto, cantidad, precio, importe, id_tienda)
      VALUES (@id_factura, @id_producto, @cantidad, @precio, @importe, @id_tienda)`;

    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al insertar ítem:", err);
    throw err;
  }
};

export default { getItems, deleteItemByLinea, updateItemByLinea, insertItem };
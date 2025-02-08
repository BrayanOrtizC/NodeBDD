// Archivo: productoModels.js
import { sql, poolConnect } from "../config/dbconfig.js";

// Obtener todos los productos
const getProductos = async () => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    const result = await request.query("SELECT * FROM V_Producto");
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener productos:", err);
    throw err;
  }
};

// Eliminar producto por ID
const deleteProductoById = async (id_producto) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("id_producto", sql.VarChar, id_producto);
    const result = await request.query("DELETE FROM V_Producto WHERE id_producto = @id_producto");
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    throw err;
  }
};

// Actualizar producto por ID
const updateProductoById = async (id_producto, producto) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();

    request.input("id_producto", sql.VarChar, id_producto);
    request.input("nombre_producto", sql.VarChar, producto.nombre_producto);
    request.input("descripcion_producto", sql.VarChar, producto.descripcion_producto);
    request.input("id_proveedor", sql.VarChar, producto.id_proveedor);
    request.input("precio_producto", sql.Decimal(10, 2), producto.precio_producto);
    request.input("id_tienda", sql.VarChar, producto.id_tienda);
    request.input("stock_min", sql.Int, producto.stock_min);
    request.input("stock", sql.Int, producto.stock);

    const query = `
      UPDATE V_Producto SET 
        nombre_producto = @nombre_producto,
        descripcion_producto = @descripcion_producto,
        id_proveedor = @id_proveedor,
        precio_producto = @precio_producto,
        id_tienda = @id_tienda,
        stock_min = @stock_min,
        stock = @stock
      WHERE id_producto = @id_producto
    `;

    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    throw err;
  }
};

// Insertar un nuevo producto
const insertProducto = async (producto) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();

    request.input("id_producto", sql.VarChar, producto.id_producto);
    request.input("nombre_producto", sql.VarChar, producto.nombre_producto);
    request.input("descripcion_producto", sql.VarChar, producto.descripcion_producto);
    request.input("id_proveedor", sql.VarChar, producto.id_proveedor);
    request.input("precio_producto", sql.Decimal(10, 2), producto.precio_producto);
    request.input("id_tienda", sql.VarChar, producto.id_tienda);
    request.input("stock_min", sql.Int, producto.stock_min);
    request.input("stock", sql.Int, producto.stock);

    const query = `
      INSERT INTO V_Producto (
        id_producto, nombre_producto, descripcion_producto, id_proveedor, precio_producto, id_tienda, stock_min, stock
      ) VALUES (
        @id_producto, @nombre_producto, @descripcion_producto, @id_proveedor, @precio_producto, @id_tienda, @stock_min, @stock
      )
    `;

    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al insertar producto:", err);
    throw err;
  }
};

export default { getProductos, deleteProductoById, updateProductoById, insertProducto };

import { sql, poolConnect } from "../config/dbconfig.js";

// Obtener todas las facturas
const getFacturas = async () => {
  try {
    const pool = await poolConnect;
    const result = await pool.request().query("SET XACT_ABORT ON SELECT * FROM V_Factura");
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener facturas:", err);
    throw err;
  }
};

// Obtener una factura por ID
const getFacturaById = async (id) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("id", sql.Int, id);
    const result = await request.query("SET XACT_ABORT ON SELECT * FROM V_Factura WHERE id = @id");
    return result.recordset[0];
  } catch (err) {
    console.error("Error al obtener factura por ID:", err);
    throw err;
  }
};

// Insertar una nueva factura
const insertFactura = async (factura) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("cliente_id", sql.Int, factura.cliente_id);
    request.input("total", sql.Decimal(10,2), factura.total);
    request.input("fecha", sql.DateTime, factura.fecha);
    request.input("detalle", sql.VarChar, factura.detalle);

    const query = `
      SET XACT_ABORT ON
      UPDATE V_Factura 
      SET 
        cc_cliente = @cc_cliente,
        id_empleado = @id_empleado,
        fecha_venta = @fecha_venta,
        precio_total = @precio_total
        id_tienda = @id_tienda
      WHERE id_factura = @id_factura
    `;

    const result = await request.query(query);
    return result.recordset[0].id; // Devuelve el ID de la nueva factura
  } catch (err) {
    console.error("Error al insertar factura:", err);
    throw err;
  }
};

export default { getFacturas, getFacturaById, insertFactura };

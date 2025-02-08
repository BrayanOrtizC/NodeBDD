import { sql, poolConnect } from "../config/dbconfig.js";

// Obtener todas las facturas
const getFacturas = async () => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    const result = await request.query("SET XACT_ABORT ON; SELECT * FROM Factura");
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener facturas:", err);
    throw err;
  }
};

// Obtener una factura por ID
const getFacturaById = async (id_factura) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("id_factura", sql.VarChar, id_factura);

    const result = await request.query("SET XACT_ABORT ON; SELECT * FROM Factura WHERE id_factura = @id_factura");
    return result.recordset[0];
  } catch (err) {
    console.error("Error al obtener la factura:", err);
    throw err;
  }
};

// Insertar una nueva factura
const insertFactura = async (factura) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();

    request.input("id_factura", sql.VarChar, factura.id_factura);
    request.input("cc_cliente", sql.VarChar, factura.cc_cliente);
    request.input("id_empleado", sql.VarChar, factura.id_empleado);
    request.input("id_tienda", sql.VarChar, factura.id_tienda);
    request.input("fecha_venta", sql.Date, factura.fecha);
    request.input("precio_total", sql.Decimal(10,2), factura.precio_total);


    const query = `
      SET XACT_ABORT ON;
      INSERT INTO V_Factura (id_factura, cc_cliente, id_empleado, id_tienda, fecha_venta, precio_total)
      VALUES (@id_factura, @cc_cliente, @id_empleado, @id_tienda, @fecha_venta, @precio_total)
    `;

    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al insertar la factura:", err);
    throw err;
  }
};

// Insertar ítems de la factura
export const insertFacturaItems = async (items, id_factura) => {
  try {
    if (!items || items.length === 0) {
      console.warn("No hay ítems para insertar.");
      return 0;
    }

    const pool = await poolConnect;
    const transaction = pool.transaction();

    await transaction.begin();
    const request = transaction.request();

    const values = items
      .map((item, index) => {
        // Si no hay un valor para num_linea, generamos uno basado en el índice
        const numLinea = item.num_linea || `LN${index + 1}`; // O cualquier lógica que necesites

        request.input(`id_producto${index}`, sql.VarChar, item.id_producto);
        request.input(`cantidad${index}`, sql.Int, item.cantidad);
        request.input(`precio${index}`, sql.Decimal(10, 2), item.precio);
        request.input(`importe${index}`, sql.Decimal(10, 2), item.importe);
        request.input(`num_linea${index}`, sql.Int, numLinea); // Usamos el valor de num_linea
        request.input(`id_tienda${index}`, sql.VarChar, item.id_tienda);


        return `(@id_factura, @id_producto${index}, @cantidad${index}, @precio${index}, @importe${index}, @num_linea${index}, @id_tienda${index})`;
      })
      .join(", ");

    request.input("id_factura", sql.VarChar, id_factura);

    const query = `
      INSERT INTO V_Items (id_factura, id_producto, cantidad, precio, importe, num_linea, id_tienda)
      VALUES ${values}
    `;

    const result = await request.query(query);
    await transaction.commit(); // Confirmar la transacción

    return result.rowsAffected.length;
  } catch (err) {
    console.error("Error al insertar ítems de la factura:", err);
    await transaction.rollback(); // Si algo falla, revertir la transacción
    throw err;
  }
};


// Eliminar una factura por ID
const deleteFacturaById = async (id_factura) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("id_factura", sql.VarChar, id_factura);

    const result = await request.query("SET XACT_ABORT ON; DELETE FROM Factura WHERE id_factura = @id_factura");
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al eliminar la factura:", err);
    throw err;
  }
};

export default { getFacturas, getFacturaById, insertFactura, insertFacturaItems, deleteFacturaById };

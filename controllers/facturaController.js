import facturaModels from "../models/facturaModels.js";


export const crearFactura = async (req, res) => {
  const { id_factura, cc_cliente, id_empleado, id_tienda, fecha, precio_total, items } = req.body;

  try {
    await facturaModels.insertFactura({id_factura, cc_cliente, id_empleado, id_tienda, fecha, precio_total });
    if (items && items.length > 0) {
      await facturaModels.insertFacturaItems(items, id_factura);
    }
    res.status(201).json({ message: "Factura e ítems guardados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar la factura", detalles: error.message });
  }
};


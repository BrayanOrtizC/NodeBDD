import facturaModels from "../models/facturaModels.js";

// Obtener todas las facturas
export const fetchFacturas = async (req, res) => {
  try {
    const facturas = await facturaModels.getFacturas();
    res.status(200).json(facturas);
  } catch (error) {
    console.error("Error al obtener facturas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener una factura por ID
export const fetchFacturaById = async (req, res) => {
  const { id } = req.params;
  try {
    const factura = await facturaModels.getFacturaById(id);
    if (!factura) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }
    res.status(200).json(factura);
  } catch (error) {
    console.error("Error al obtener la factura:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear una nueva factura
export const addFactura = async (req, res) => {
  const nuevaFactura = req.body;
  try {
    const result = await facturaModels.insertFactura(nuevaFactura);
    res.status(201).json({ message: "Factura creada exitosamente", id: result });
  } catch (error) {
    console.error("Error al crear la factura:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default { fetchFacturas, fetchFacturaById, addFactura };


/*
const Factura = require("../models/facturaModels");

// Obtener todas las facturas
exports.getAllFacturas = async (req, res) => {
    try {
        const facturas = await Factura.find();
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las facturas" });
    }
};

// Obtener una factura por ID
exports.getFacturaById = async (req, res) => {
    try {
        const factura = await Factura.findById(req.params.id);
        if (!factura) {
            return res.status(404).json({ error: "Factura no encontrada" });
        }
        res.json(factura);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la factura" });
    }
};

// Crear una nueva factura
exports.createFactura = async (req, res) => {
    try {
        const nuevaFactura = new Factura(req.body);
        await nuevaFactura.save();
        res.status(201).json(nuevaFactura);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la factura" });
    }
};

// Actualizar una factura
exports.updateFactura = async (req, res) => {
    try {
        const factura = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!factura) {
            return res.status(404).json({ error: "Factura no encontrada" });
        }
        res.json(factura);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la factura" });
    }
};

// Eliminar una factura
exports.deleteFactura = async (req, res) => {
    try {
        const factura = await Factura.findByIdAndDelete(req.params.id);
        if (!factura) {
            return res.status(404).json({ error: "Factura no encontrada" });
        }
        res.json({ message: "Factura eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la factura" });
    }
};*/

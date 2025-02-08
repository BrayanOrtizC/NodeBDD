import express from "express";
import userRoutes from "./routes/userRoutes.js";
import clienteRoute from "./routes/clienteRoute.js";
import proveedorRoute from "./routes/proveedorRoute.js";
import empleadoRoute from "./routes/empleadoRoute.js";
import itemRoute from "./routes/itemRoute.js";
import productoRoute from "./routes/productoRoute.js";
import facturaRoutes from "./routes/facturaRoutes.js";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middlewares
app.use(express.json());

// Rutas
app.use("/api", userRoutes);
app.use("/api/clientes", clienteRoute); 
app.use("/api/proveedores", proveedorRoute);
app.use("/api/empleados", empleadoRoute); 
app.use("/api/items", itemRoute); 
app.use("/api/productos", productoRoute); 
app.use("/api/facturas", facturaRoutes); 




// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

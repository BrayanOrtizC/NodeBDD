import express from "express";
import userRoutes from "./routes/userRoutes.js";
import clienteRoute from "./routes/clienteRoute.js";

import cors from 'cors';


const app = express();
app.use(cors({
    origin: 'http://localhost:5173' // Aquí colocas la URL de tu cliente React
    }));

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api/clientes', clienteRoute);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

import { sql, poolConnect } from "../config/dbconfig.js";

const getProducts = async () => {
  try {
    const pool = await poolConnect; // Espera la conexión
    const request = pool.request(); // Usa el pool para hacer la consulta
    const result = await request.query('SELECT * FROM Cliente_001');
    console.table(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    throw err;
  }
};

export default { getProducts };

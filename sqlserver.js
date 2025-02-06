import {getConnection, mssql} from "./connectionSQLServer.js";

const getProducts = async() => {
    try{
            const pool = await getConnection();
            const result = await pool.request().query("SELECT * FROM Producto_001")
            console.table(result.recordset)
            console.log("Procutos listados")
        }
        catch(error){
            console.error(error);
        }
}
getProducts();
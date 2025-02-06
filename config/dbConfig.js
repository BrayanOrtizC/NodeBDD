import sql from "mssql";

const poolConnect = sql.connect({
  user: 'sa',
  password: 'P@ssw0rd',
  server: 'WINDOWSPRE',
  database: 'Tienda_UIO',
  options: {
    encrypt: true, // True si usas Azure
    trustServerCertificate: true, // Si usas certificados locales
  },
});


// Exporta el pool y el sql
export { poolConnect, sql };


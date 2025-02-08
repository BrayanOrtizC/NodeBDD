import sql from "mssql";

const poolConnect = sql.connect({
  user: 'sa',
  password: 'P@ssw0rd',
  server: 'OZZYJAMES',
  database: 'Tienda_GYE',
  options: {
    encrypt: true, // True si usas Azure
    trustServerCertificate: true, // Si usas certificados locales
  },
});


// Exporta el pool y el sql
export { poolConnect, sql };


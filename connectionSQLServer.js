import mssql from "mssql";

const connectionSettings = {
  user: "sa",
  password: "P@ssw0rd",
  server: "OZZYJAMES",
  database: "Tienda_GYE",
  options: {
    encrypt: true, // True si usas Azure
    trustServerCertificate: true, // Si usas certificados locales
  },
};

export async function getConnection() {
  try {
    return await mssql.connect(connectionSettings);
  } catch (error) {
    console.error(error);
  }
}
export { mssql };

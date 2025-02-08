import { sql, poolConnect } from "../config/dbconfig.js";

// Obtener todos los empleados
const getEmpleados = async () => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    const result = await request.query(
      "SET XACT_ABORT ON; SELECT * FROM V_C_Empleado"
    );
    console.table(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("Error al obtener empleados:", err);
    throw err;
  }
};

// Eliminar empleado por cédula
const deleteEmpleadoByCC = async (id_empleado) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("id_empleado", sql.VarChar, id_empleado);
    const result = await request.query(`
        SET XACT_ABORT ON;
        begin tran
        DELETE FROM Pago_Empleado
        WHERE id_empleado = @id_empleado;
        DELETE FROM V_Empleado
        WHERE id_empleado = @id_empleado;
        commit tran
        `);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al eliminar empleado:", err);
    throw err;
  }
};

// Actualizar empleado por cédula
const updateEmpleadoByCC = async (id_empleado, empleado) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();

    request.input("id_empleado", sql.VarChar, empleado.id_empleado);
    request.input("nombre_empleado", sql.VarChar, empleado.nombre_empleado);
    request.input("puesto_empleado", sql.VarChar, empleado.puesto_empleado);
    request.input("estado_laboral", sql.VarChar, empleado.estado_laboral);
    request.input("id_tienda", sql.VarChar, empleado.id_tienda);
    request.input("salario", sql.Decimal(10,2), empleado.salario);
    request.input("cuenta_bancaria", sql.VarChar, empleado.cuenta_bancaria);

    const query = `
        SET XACT_ABORT ON;
        begin tran
        UPDATE V_Empleado
        SET nombre_empleado = @nombre_empleado,
            puesto_empleado = @puesto_empleado,
            id_tienda = @id_tienda,
            estado_laboral = @estado_laboral
        WHERE id_empleado = @id_empleado;

        UPDATE Pago_Empleado
        SET salario = @salario,
            cuenta_bancaria = @cuenta_bancaria
        WHERE id_empleado = @id_empleado;
        commit tran
    `;

    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al actualizar empleado:", err);
    throw err;
  }
};

// Insertar un nuevo empleado
const insertEmpleado = async (empleado) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();

    request.input("id_empleado", sql.VarChar, empleado.id_empleado);
    request.input("nombre_empleado", sql.VarChar, empleado.nombre_empleado);
    request.input("puesto_empleado", sql.VarChar, empleado.puesto_empleado);
    request.input("estado_laboral", sql.VarChar, empleado.estado_laboral);
    request.input("id_tienda", sql.VarChar, empleado.id_tienda);
    request.input("salario", sql.VarChar, empleado.salario);
    request.input("cuenta_bancaria", sql.VarChar, empleado.cuenta_bancaria);

    const query = `
      SET XACT_ABORT ON;
      begin tran
      INSERT INTO V_Empleado (id_empleado, nombre_empleado, puesto_empleado, id_tienda, estado_laboral)
        VALUES (@id_empleado, @nombre_empleado, @puesto_empleado, @id_tienda, @estado_laboral);

        INSERT INTO Pago_Empleado (id_empleado, salario, cuenta_bancaria)
        VALUES (@id_empleado, @salario, @cuenta_bancaria);
        commit tran
    `;

    const result = await request.query(query);
    return result.rowsAffected[0];
  } catch (err) {
    console.error("Error al insertar empleado:", err);
    throw err;
  }
};

// Obtener un empleado por cédula
const getEmpleadoByCC = async (id_empleado) => {
  try {
    const pool = await poolConnect;
    const request = pool.request();
    request.input("id_empleado", sql.VarChar, id_empleado);

    const result = await request.query(
      "SET XACT_ABORT ON; SELECT * FROM V_C_Empleado WHERE id_empleado = @id_empleado"
    );
    return result.recordset[0];
  } catch (err) {
    console.error("Error al obtener empleado:", err);
    throw err;
  }
};

export default {
  getEmpleados,
  deleteEmpleadoByCC,
  updateEmpleadoByCC,
  insertEmpleado,
  getEmpleadoByCC,
};

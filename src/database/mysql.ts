import * as mysql from "mysql2/promise";  // Cambiado de `mysql.createPool` a `createPool`
import { Signale } from "signale";
import * as dotenv from 'dotenv';

const signale = new Signale();
dotenv.config();

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_DATABASE || 'soa',
    password: process.env.DB_PASSWORD || '13960',
    waitForConnections: true,
    connectionLimit: 10,
};
console.log('Configuración de la base de datos:', config);


// Crear el pool de conexiones
const pool = mysql.createPool(config);  // Cambiado de `mysql.createPool` a `createPool`

export async function query(sql: string, params: any[]) {
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const result = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        signale.error(error);
        return null;
    }
}

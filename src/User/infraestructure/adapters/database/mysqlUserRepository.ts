import { query } from "../../../../database/mysql";
import { generateToken } from "../../../../utils/jwtUtils";
import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/userRepository";





export class MysqlUserRepository implements UserRepository {
  

  //Agregar
  async addUser(name: string, password: string, email: string, status: string): Promise<User> {
    try {
      const sql = `
        INSERT INTO users (name, password, email, status)
        VALUES (?, ?, ?, ?)
      `;
      const params: any[] = [name, password, email, status];
      const [result]: any = await query(sql, params);
  
      
  
      const userId = result.insertId;
      const user = new User(userId.toString(), name, password, email, status);
  
      // Generar el token y asignarlo al usuario
      const token = generateToken(user.id);
      user.token = token; // Asignar el token al usuario
      console.log(token);

      if (!result || !result.insertId) {
        throw new Error('No se pudo obtener el ID del usuario insertado.'+ token);
      }
  
      return user;
    } catch (error) {
      console.error('Error al agregar un usuario:', error);
      throw new Error('Error al agregar un usuario. Consulta los logs para más detalles.');
    }
  }
  
  //eliminar
  async deleteUser(userId: string): Promise<boolean> {
    try {
      const sql = `
        DELETE FROM users
        WHERE id = ?
      `;
      const params: any[] = [userId];
      const [result]: any = await query(sql, params);
  
      if (!result || result.affectedRows === 0) {
        throw new Error(`No se encontró un usuario con el ID ${userId}`);
      }
  
      console.log(`Usuario con ID ${userId} eliminado correctamente.`);
  
      return true;
    } catch (error) {
      console.error('Error al eliminar un usuario:', (error as Error).message);
      throw new Error('Error al eliminar un usuario. Consulta los logs para más detalles.');
    }
  }

  //listar todo 
  async listAllUsers(): Promise<User[]> {
    try {
      const sql = `
        SELECT id, name, password, email, status
        FROM users
      `;
      const params: any[] = [];  // No hay parámetros en esta consulta
      const [rows]: any = await query(sql, params);

      const users: User[] = rows.map((row: any) => {
        return new User(
          row.id.toString(),
          row.name,
          row.password,
          row.email,
          row.status
        );
      });

      return users;
    } catch (error) {
      console.error('Error al listar usuarios:', (error as Error).message);
      throw new Error('Error al listar usuarios. Consulta los logs para más detalles.');
    }
  }


  async getUserById(id: number): Promise<User | null> {
    try {
      const sql = "SELECT * FROM users WHERE id = ?";
      const params: any[] = [id];
      const [result]: any = await query(sql, params);
  
      if (result && result.length > 0) {
        const iduser = result[0];
        return new User(
          iduser.id,
          iduser.name,
          iduser.password,
          iduser.email,
          iduser.status,
        );
      } else {
        return null; // No se encontró un libro con el ID especificado
      }
    } catch (error) {
      console.error("Error al obtener el libro por ID:", error);
      return null;
    }
 
} 


}
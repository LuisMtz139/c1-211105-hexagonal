import { query } from "../../../database/mysql";
import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { generateToken, verifyToken } from "../../../utils/jwtUtils";




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


  getUserById(userId: String): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
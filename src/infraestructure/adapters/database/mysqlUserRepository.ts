import { query } from "../../../database/mysql";
import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/userRepository";




export class MysqlUserRepository implements UserRepository {
  async addUser(name: string, password: string, email: string, status: string): Promise<User> {
    try {
      const sql = `
        INSERT INTO users (name, password, email, status)
        VALUES (?, ?, ?, ?)
      `;
      const params: any[] = [name, password, email, status];
      const [result]: any = await query(sql, params);

      if (!result || !result.insertId) {
        throw new Error('No se pudo obtener el ID del usuario insertado.');
      }

      const userId = result.insertId;
      return new User(userId, name, password, email, status);
    } catch (error) {
      console.error('Error al agregar un usuario:', error);
      throw new Error('Error al agregar un usuario. Consulta los logs para más detalles.');
    }
  }
  
   
}
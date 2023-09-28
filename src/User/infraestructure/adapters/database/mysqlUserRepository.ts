import { query } from "../../../../database/mysql";
import { generateToken } from "../../../../utils/jwtUtils";
import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/userRepository";


interface FilterOptions {
  email?: string;
  name?: string;
}


export class MysqlUserRepository implements UserRepository {

  //Agregar
  async addUser(name: string, password: string, email: string, status: boolean): Promise<User> {
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
      throw new Error('Error al agregar un usuario.');
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
      throw new Error('Error al eliminar un usuario');
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
      throw new Error('Error al listar usuarios');
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
      console.error("Error al obtener el usuairo por ID:", error);
      return null;
    }
 
} 

async updatePassword(id: number, newPassword: string): Promise<User | null> {
  try {
    const sql = `
      UPDATE users
      SET password = ?
      WHERE id = ?
    `;
    const params: any[] = [newPassword, id];
    const [result]: any = await query(sql, params);

    if (!result || result.affectedRows === 0) {
      throw new Error(`No se encontró un usuario con el ID ${id}`);
    }

    // Assuming you need to fetch and return the updated user
    const updatedUser = await this.getUserById(id);
    return updatedUser;
  } catch (error) {
    console.error('Error al actualizar ', error);
    throw new Error('Error al actualizar la contraseña ');
  }
}


async updateUser(
  id: number,
  newUser?: { name?: string; password?: string; email?: string; status?: string }
): Promise<User | null> {
  try {
    const { name, password, email, status } = newUser || {};

    const sql = `
      UPDATE users
      SET name = ?, password = ?, email = ?, status = ?
      WHERE id = ?
    `;

    const params: any[] = [name, password, email, status, id];
    const [result]: any = await query(sql, params);

    if (!result || result.affectedRows === 0) {
      throw new Error(`No se encontró el ID ${id}`);
    }

    // Obtener y devolver el usuario actualizado
    const updatedUser = await this.getUserById(id);
    return updatedUser;
  } catch (error) {
    console.error('No se puede actualziar', error);
    throw new Error('No se puede actualizar');
  }
}


async activeUser(id: number): Promise<User | null> {
  try {
    const sql = `
      UPDATE users
      SET status = true
      WHERE id = ?
    `;
    const params: any[] = [id];
    const [result]: any = await query(sql, params);

    if (!result || result.affectedRows === 0) {
      throw new Error(`No se encontró un usuario con el ID ${id}`);
    }

    // Obtener y devolver el usuario actualizado
    const updatedUser = await this.getUserById(id);
    return updatedUser;
  } catch (error) {
    console.error('Error al activar el usuario:', error);
    throw new Error('Error al activar el usuario');
  }
}

async listUserInactive(): Promise<User[]> {
  try {
    const sql = `
      SELECT id, name, password, email, status
      FROM users
      WHERE status = 'inactive'
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
    console.error('No se pudo listar usuarios inactivos:', (error as Error).message);
    throw new Error('No se pudo listar usuarios inactivos:');
  }
}

//obtener usuarios ya sea por name o email

// Obtener usuarios ya sea por name o email
async filterUser(filter: string, email?: string, name?: string): Promise<User[]> {
  const validFilters = ['email', 'name'];

  if (!validFilters.includes(filter)) {
    throw new Error('typo invalido');
  }

  if ((filter === 'email' && !email) || (filter === 'name' && !name)) {
    throw new Error(`${filter.charAt(0).toUpperCase() + filter.slice(1)} error  ${filter}`);
  }

  const sql = `SELECT * FROM users WHERE ${filter} = ?`;
  const value = filter === 'email' ? email : name;

  try {
    const [rows]: any = await query(sql, [value]);

    // Si no hay resultados, devolver un array vacío
    if (!rows || rows.length === 0) {
      return [];
    }

    // Mapear los resultados a objetos User
    const users: User[] = rows.map((row: User) => new User(row.id, row.name, row.password, row.email, row.status));  // Asegúrate de que 'status' sea accesible en 'row'
    return users;
  } catch (error) {
    throw new Error('Error al obtener');
  }
}
//eliminar reseña no terminada
async eliminarReseña(userId: number, reviewId: string): Promise<boolean> {
  const sql = `
    DELETE FROM reviews
    WHERE userId = ? AND reviewId = ?
  `;
  const params: any[] = [userId, reviewId];

  return new Promise((resolve, reject) => {
    query(sql, params)
      .then(([result]: any) => {
        if (result && result.affectedRows > 0) {
          console.log(`Reseña con ID ${reviewId} eliminada para el usuario con ID ${userId}.`);
          resolve(true);
        } else {
          console.log(`No se encontró una reseña con ID ${reviewId} para el usuario con ID ${userId}.`);
          resolve(false);
        }
      })
      .catch((error: any) => {
        console.error('Error al eliminar la reseña:', error);
        reject(false);
      });
  });
}


//iniciarSesion 
//quiero iniciar sesion por medio el email y es password, quiero que me hagas una sentencia para poder validar si estos campos existen en la base de datos
async iniciarSesion(email: string, password: string): Promise<User | null> {
  try {
    const sql = `
      SELECT id, name, password, email, status
      FROM users
      WHERE email = ? AND password = ?
    `;
    const params: any[] = [email, password];
    const [rows]: any = await query(sql, params);

    // Si no se encuentra un usuario con el email y contraseña proporcionados
    if (!rows || rows.length === 0) {
      return null;
    }

    // Devolver el usuario encontrado
    const user = new User(
      rows[0].id.toString(),
      rows[0].name,
      rows[0].password,
      rows[0].email,
      rows[0].status
    );

    // Generar el token y asignarlo al usuario
    const token = generateToken(user.id);
    user.token = token; // Asignar el token al usuario

    return user;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error('Error al iniciar sesión');
  }
}


}




import { query } from "../../../../database/mysql";
import { generateToken } from "../../../../utils/jwtUtils";
import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { OkPacket, RowDataPacket, ResultSetHeader, FieldPacket, ProcedureCallPacket } from 'mysql2';


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
      SET status = false
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
      WHERE status = true
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

//iniciarSesion 
//quiero iniciar sesion por medio el email y es password, quiero que me hagas una sentencia para poder validar si estos campos existen en la base de datos
async iniciarSesion(email: string, password: string): Promise<User | null> {
  try {
    const sqlSelect = `
      SELECT id, name, password, email, status
      FROM users
      WHERE email = ? AND password = ?
    `;
    const paramsSelect: any[] = [email, password];
    const [rows]: any = await query(sqlSelect, paramsSelect);

    // Si no se encuentra un usuario con el email y contraseña proporcionados
    if (!rows || rows.length === 0) {
      return null;
    }

    const userId = rows[0].id.toString();

    // Actualizar el status a true
    const sqlUpdateStatus = `
      UPDATE users
      SET status = ?
      WHERE id = ?
    `;
    const paramsUpdateStatus: any[] = [true, userId];
    await query(sqlUpdateStatus, paramsUpdateStatus);

    // Devolver el usuario encontrado con el status actualizado
    const user = new User(
      userId,
      rows[0].name,
      rows[0].password,
      rows[0].email,
      true
    );

    // Generar el token y asignarlo al usuario
    const token = generateToken(userId);
    user.token = token;

    return user;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error('Error al iniciar sesión');
  }
}

//cerarSesion 
async cerrarSesion(id: number): Promise<User | null> {
  try {
    const sql = `
      UPDATE users
      SET status = false
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
    console.error('Errro al cerar sesion:', error);
    throw new Error('Error al cerrar sesion');
  }
}



//prestar un libro 
 //prestar un libro unicamente si el usuario no tiene un libro prestado

 async checkBookAvailability(bookId: number): Promise<boolean> {
  try {
    const sql = `
      SELECT is_loaded, status
      FROM books
      WHERE id = ?
    `;
    const params: any[] = [bookId];
    const [rows]: any = await query(sql, params);

    if (rows && rows.length > 0) {
      const book = rows[0];
      return book.is_loaded && book.status;
    }

    return false;
  } catch (error) {
    console.error('Error al verificar la disponibilidad del libro:', error);
    throw new Error('Error al verificar la disponibilidad del libro');
  }
}

async hasUserLoanedBook(userId: number, bookId: number): Promise<boolean> {
  try {
    const sql = `
      SELECT COUNT(*) AS count
      FROM prestamos
      WHERE id_User = ? AND id_Book = ? AND estado = true;
    `;
    const params: any[] = [userId, bookId];
    const [rows]: any = await query(sql, params);

    return rows && rows.length > 0 && rows[0].count > 0;
  } catch (error) {
    console.error('Error al verificar si el usuario ha prestado el libro:', error);
    throw new Error('Error al verificar si el usuario ha prestado el libro');
  }
}
async performBookLoan(userId: number, bookId: number): Promise<void> {
  try {
    const updateBookSql = `
      UPDATE books
      SET is_loaded = false
      WHERE id = ?
    `;
    const updateBookParams: any[] = [bookId];
    await query(updateBookSql, updateBookParams);

    const prestamoDate = new Date();  // Fecha actual como fecha de préstamo

    // Sumar 30 días a la fecha de préstamo para la fecha de entrega
    const entregaDate = new Date();
    entregaDate.setDate(prestamoDate.getDate() + 30);  // Asumiendo un préstamo de 30 días

    const insertPrestamoSql = `
      INSERT INTO prestamos (prestamo, entrega, estado, id_Book, id_User)
      VALUES (?, ?, true, ?, ?)
    `;
    const insertPrestamoParams: any[] = [prestamoDate, entregaDate, bookId, userId];
    await query(insertPrestamoSql, insertPrestamoParams);
  } catch (error) {
    console.error('Error al realizar el préstamo del libro:', error);
    throw new Error('Error al realizar el préstamo del libro');
  }
}

async prestarLibro(userId: number, bookId: number): Promise<string | null> {
  try {
    const isBookAvailable = await this.checkBookAvailability(bookId);

    if (!isBookAvailable) {
      return "El libro no está disponible para préstamo.";
    }

    const hasLoanedBook = await this.hasUserLoanedBook(userId, bookId);

    if (hasLoanedBook) {
      return "El usuario ya ha prestado este libro.";
    }

    await this.performBookLoan(userId, bookId);

    return "Libro prestado exitosamente.";
  } catch (error) {
    console.error('Error al prestar el libro:', error);
    throw new Error('Error al prestar el libro');
  }
}

//devolver un libro unicamente si hay un libro prestado
//devolver un libro unicamente si hay un libro prestado
async devolverLibro(userId: number, bookId: number): Promise<string | null> {
  try {
    // Verificar si el usuario tiene el libro prestado
    const hasLoanedBook = await this.hasUserLoanedBook(userId, bookId);

    if (!hasLoanedBook) {
      return "El usuario no ha prestado este libro.";
    }

    // Actualizar el estado de préstamo del libro a true
    const updateBookSql = `
      UPDATE books
      SET is_loaded = true
      WHERE id = ?
    `;
    const updateBookParams: any[] = [bookId];
    await query(updateBookSql, updateBookParams);

    // Marcar el préstamo como devuelto
    const updatePrestamoSql = `
      UPDATE prestamos
      SET estado = false
      WHERE id_User = ? AND id_Book = ?
    `;
    const updatePrestamoParams: any[] = [userId, bookId];
    await query(updatePrestamoSql, updatePrestamoParams);

    return "Libro devuelto exitosamente.";
  } catch (error) {
    console.error('Error al devolver el libro:', error);
    throw new Error('Error al devolver el libro');
  }
}

async eliminarReseña(userId: number, reviewId: String): Promise<boolean> {
  try {
    const sql = `
      DELETE FROM Review
      WHERE id_User = ? AND id = ?
    `;
    const params: any[] = [userId, reviewId];
    const [result]: any = await query(sql, params);

    if (!result || result.affectedRows === 0) {
      throw new Error(`No se encontró una reseña asociada al usuario con el ID ${userId} y la reseña con el ID ${reviewId}`);
    }

    console.log(`Reseña con ID ${reviewId} eliminada correctamente para el usuario con ID ${userId}.`);
    return true;
  } catch (error) {
    console.error('Error al eliminar la reseña:', (error as Error).message);
    throw new Error('Error al eliminar la reseña');
  }}
  //Escribir resena del libro unicamente si ha prestado el libro y lo ha devuelto

  async escribirResena(userId: number, bookId: number, reviewText: string): Promise<boolean | null> {
    try {
      // Verificar si el usuario ha prestado y devuelto el libro
      const hasLoanedAndReturnedBook = await this.hasLoanedAndReturnedBook(userId, bookId);
  
      if (!hasLoanedAndReturnedBook) {
        return null; // El usuario no ha prestado y devuelto el libro
      }
  
      // Guardar la reseña en la base de datos
      const sql = `
        INSERT INTO Review (id_User, id_Book, review_text, status)
        VALUES (?, ?, ?, true)
      `;
      const params: any[] = [userId, bookId, reviewText];
      const [result]: any = await query(sql, params);
  
      if (!result || !result.insertId) {
        throw new Error('No se pudo guardar la reseña.');
      }
  
      console.log(`Reseña guardada correctamente para el usuario con ID ${userId} y el libro con ID ${bookId}.`);
      return true;
    } catch (error) {
      console.error('Error al escribir la reseña:', (error as Error).message);
      throw new Error('Error al escribir la reseña');
    }
  }
  
  async hasLoanedAndReturnedBook(userId: number, bookId: number): Promise<boolean> {
    try {
      const sql = `
        SELECT COUNT(*) AS count
        FROM prestamos
        WHERE id_User = ? AND id_Book = ? AND estado = false;
      `;
      const params: any[] = [userId, bookId];
      const [rows]: any = await query(sql, params);
  
      return rows && rows.length > 0 && rows[0].count > 0;
    } catch (error) {
      console.error('Error al verificar si el usuario ha prestado y devuelto el libro:', error);
      throw new Error('Error al verificar si el usuario ha prestado y devuelto el libro');
    }
  }
  








}





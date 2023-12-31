import { query } from "../../../../database/mysql";
import { Loan } from "../../../domain/entities/loans";
import { LoanRepository } from "../../../domain/repositories/loansRepository";
import { generateToken } from "../../../../utils/jwtUtils";




export class MysqlLoanRepository implements LoanRepository {

  async createLoan(loan: string, delivery: string, status: boolean, id_Book: number, id_User: number): Promise<Loan|null> {
    try {
      const sql = `
        INSERT INTO Loans (loan, delivery, status, id_Book,id_User)
        VALUES (?, ?, ?, ?, ?)
      `;
      const params: any[] = [loan, delivery, status, id_Book,id_User];
      const [result]: any = await query(sql, params);
  
      
  
      const userId = result.insertId;
      const user = new Loan(userId.toString(), loan, delivery, status, id_Book, id_User)
  
      return user;
    } catch (error) {
      console.error('Error al agregar un loan:', error);
      throw new Error('Error al agregar un loan.');
    }
 }

async  deleteLoan(loanId: string): Promise<boolean> {
  try {
    // SQL query to delete a loan by its ID
    const sql = `
      DELETE FROM Loans
      WHERE id = ?
    `;
    
    // Parameters for the SQL query (loanId as the parameter)
    const params: any[] = [loanId || null];  // Replace undefined with null
    
    // Execute the SQL query with the provided parameters
    const [result]: any = await query(sql, params);

    // Check if a loan was affected by the delete operation
    if (!result || result.affectedRows === 0) {
      throw new Error(`No se encontró un loan con el ID ${loanId}`);
    }

    console.log(`Préstamo con ID ${loanId} eliminado correctamente.`);

    return true;
  } catch (error) {
    console.error('Error al eliminar el loan:', (error as Error).message);
    throw new Error('Error al eliminar un loan');
  }
}

async getAllLoan(): Promise<Loan[]> {
  try {
    const sql = `
      SELECT *
      FROM loans
    `;
    const params: any[] = [];  // No hay parámetros en esta consulta
    const [rows]: any = await query(sql, params);

    const prestamos: Loan[] = rows.map((row: any) => {
      return new Loan(
        row.id.toString(),
        row.prestamo,
        row.entrega,
        row.estado,
        row.id_Book,
        row.id_User
      );
    });

    return prestamos;
  } catch (error) {
    console.error('Error al listar los prestamos:', (error as Error).message);
    throw new Error('Error al listar los prestamos');
  }
}


async  getLoanById(id: number): Promise<Loan | null> {
  try {
    const sql = "SELECT * FROM Loans WHERE id = ?";//deve existir un usuario
    const params: any[] = [id];
    const [result]: any = await query(sql, params);

    if (result && result.length > 0) {
      const idLoan = result[0];
      return new Loan(
        idLoan.id,
        idLoan.loan,
        idLoan.delivery,
        idLoan.status,
        idLoan.id_Book,
        idLoan.id_User
      );
    } else {
      return null; // No se encontró un préstamo con el ID especificado
    }
  } catch (error) {
    console.error("Error al obtener el préstamo por ID:", error);
    return null;
  }
  
}


async updateLoan(id: number, newUser?: { loan?: string; delivery?: string; status?: boolean;  }): Promise<Loan | null> {
  try {
    const { loan, delivery, status } = newUser || {};

    const sql = `
      UPDATE Loans
      SET loan = ?, delivery = ?, status = ?
      WHERE id = ?
    `;

    const params: any[] = [loan, delivery, status, id];
    const [result]: any = await query(sql, params);

    if (!result || result.affectedRows === 0) {
      throw new Error(`No se encontró el ID ${id}`);
    }

    // Obtener y devolver el usuario actualizado
    const updateLoan = await this.getLoanById(id)
    return updateLoan;
  } catch (error) {
    console.error('No se puede actualiar el Loan', error);
    throw new Error('No se puede actualizar');
  }
}

      
}
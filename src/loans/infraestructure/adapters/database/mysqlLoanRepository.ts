import { query } from "../../../../database/mysql";
import { Loan } from "../../../domain/entities/loans";
import { LoanRepository } from "../../../domain/repositories/loansRepository";
import { generateToken } from "../../../../utils/jwtUtils";




export class MysqlLoanRepository implements LoanRepository {

  async  createLoan(id_Book: number, id_User: number, prestamo: string, entrega: string, estado: string): Promise<Loan | null> {
    try {

        const insertSql = `
            INSERT INTO prestamos (prestamo, entrega, estado, id_Book, id_User)
            VALUES (?, ?, ?, ?, ?);
        `;

        const params: any[] = [id_Book, id_User, prestamo, entrega, estado];
        const [result]: any = await query(insertSql, params);

        if (!result || !result.insertId) {
            throw new Error('No se pudo obtener el ID del préstamo insertado.');
        }

        const loanId = result.insertId;
        const loan: Loan = {
            id: loanId,
            id_Book,
            id_User,
            prestamo,
            entrega,
            estado
        };

        return loan;
    } catch (error) {
        console.error('Error al agregar un préstamo:', error);
        throw new Error('Error al agregar un préstamo.');
    }
}

async  deleteLoan(loanId: string): Promise<boolean> {
  try {
    // SQL query to delete a loan by its ID
    const sql = `
      DELETE FROM prestamos
      WHERE id = ?
    `;
    
    // Parameters for the SQL query (loanId as the parameter)
    const params: any[] = [loanId || null];  // Replace undefined with null
    
    // Execute the SQL query with the provided parameters
    const [result]: any = await query(sql, params);

    // Check if a loan was affected by the delete operation
    if (!result || result.affectedRows === 0) {
      throw new Error(`No se encontró un préstamo con el ID ${loanId}`);
    }

    console.log(`Préstamo con ID ${loanId} eliminado correctamente.`);

    return true;
  } catch (error) {
    console.error('Error al eliminar un préstamo:', (error as Error).message);
    throw new Error('Error al eliminar un préstamo');
  }
}

async getAllLoan(): Promise<Loan[]> {
  try {
    const sql = `
      SELECT *
      FROM prestamos
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

      
}
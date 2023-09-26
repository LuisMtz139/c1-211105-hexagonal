import { query } from "../../../../database/mysql";
import { Loan } from "../../../domain/entities/loans";
import { LoansRepository } from "../../../domain/repositories/loansRepository";
import { generateToken } from "../../../../utils/jwtUtils";




export class MysqlLoanRepository implements LoansRepository {
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

      
}
import { Loans } from "../entities/loans";

export interface LoansRepository{
    createLoan(prestamo: Date, entrega: Date,estado:String): Promise<Loans | null>
}
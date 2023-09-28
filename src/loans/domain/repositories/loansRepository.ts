import { Loan } from "../entities/loans";

export interface LoanRepository{
    createLoan(id_Book:Number,id_User: Number, prestamo:String,entrega:String,estado:String):Promise<Loan | null>

    //eliminar una prestamo
    deleteLoan(loanId:String): Promise<boolean>;

    //listar todos los usuarios

    getAllLoan(): Promise<Loan[]>;
}
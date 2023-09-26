import { Loan } from "../entities/loans";

export interface LoansRepository{
    createLoan(id_Book:Number,id_User: Number, prestamo:String,entrega:String,estado:String):Promise<Loan | null>
}

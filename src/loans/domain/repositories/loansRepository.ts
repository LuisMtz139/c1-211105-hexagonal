import { Loan } from "../entities/loans";

export interface LoanRepository{
    createLoan(id_Book:Number,id_User: Number, prestamo:String,entrega:String,estado:String):Promise<Loan | null>

    //eliminar una prestamo
    deleteLoan(loanId:String): Promise<boolean>;

    //listar todos los usuarios
    getAllLoan(): Promise<Loan[]>;

    //obtener un loan por id
    getLoanById(id:number):Promise<Loan | null>

    //actualizar Lona
    updateLoan(id: number,newUser?: { prestamo?: string; entrega?: string; estado?: string }): Promise<Loan | null>;

}
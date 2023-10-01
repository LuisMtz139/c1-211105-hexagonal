import { Loan } from "../entities/loans";

export interface LoanRepository{
    createLoan(loan:string,delivery: string,status:boolean,id_Book:number,id_User: number):Promise<Loan | null>;
    //eliminar una prestamo
    deleteLoan(loanId:String): Promise<boolean>;

    //listar todos los usuarios
    getAllLoan(): Promise<Loan[]>;

    //obtener un loan por id
    getLoanById(id:number):Promise<Loan | null>

    //actualizar Lona
    updateLoan(id: number,newUser?: { loan?: string; delivery?: string; status?: boolean }): Promise<Loan | null>;

}
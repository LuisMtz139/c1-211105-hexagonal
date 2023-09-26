import { Loan } from "../domain/entities/loans";
import { LoansRepository } from "../domain/repositories/loansRepository";

export class CreateLonUseCase{
    constructor(readonly loansRepository: LoansRepository ){}
    
    async run( id_Book:Number,id_User: Number, prestamo:String,entrega:String,estado:String ):Promise<Loan | null>{
        try {
            const createLoan = await this.loansRepository.createLoan(id_Book,id_User, prestamo,entrega,estado)
            return createLoan;
        } catch (error) {
            return null
        }
    }

}
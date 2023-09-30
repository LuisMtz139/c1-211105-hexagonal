import { validate } from "class-validator";
import { Loan } from "../domain/entities/loans";
import { LoanRepository } from "../domain/repositories/loansRepository";
import { ValidationIdLoan } from "../domain/validations/validationsLoans";


export class GetLoanByIdUseCase{
    constructor (readonly loanRepository: LoanRepository ){}

    async getLoanId(id:number):Promise<Loan|null>{
      let valitationPost = new ValidationIdLoan(id);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
        throw new Error(JSON.stringify(validation));
        }
        try {
            const loanId = await this.loanRepository.getLoanById(id);
            return loanId;
          } catch (error) {
            return null;
          }
    }
}
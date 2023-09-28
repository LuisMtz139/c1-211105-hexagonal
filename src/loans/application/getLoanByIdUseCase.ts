import { Loan } from "../domain/entities/loans";
import { LoanRepository } from "../domain/repositories/loansRepository";


export class GetLoanByIdUseCase{
    constructor (readonly loanRepository: LoanRepository ){}

    async getLoanId(id:number):Promise<Loan|null>{
        try {
            const loanId = await this.loanRepository.getLoanById(id);
            return loanId;
          } catch (error) {
            return null;
          }
    }
}
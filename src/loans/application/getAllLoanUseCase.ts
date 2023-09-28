import { Loan } from "../domain/entities/loans";
import { LoanRepository } from "../domain/repositories/loansRepository";

export class GetAllLoanUseCase{
    constructor(readonly loanRepository: LoanRepository ){}
    async getAllLoan(): Promise<Loan[]> {
        try {
          const loan = await this.loanRepository.getAllLoan();
          return loan || [];
        } catch (error) {
            return []
        }
      }
      
}


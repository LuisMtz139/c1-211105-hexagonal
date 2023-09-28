import { Loan } from "../domain/entities/loans";
import { LoanRepository } from "../domain/repositories/loansRepository";

export class UpdateLoanUseCase {
    constructor(readonly loanRepository: LoanRepository) {}
  
    async updateLoan(
      id: number,
      newUser?: { prestamo?: string; entrega?: string; estado?: string; }
    ): Promise<Loan | null> {
      try {
        const updateLoan = await this.loanRepository.updateLoan(id,newUser)
        return updateLoan;
      } catch (error) {
        return null;
      }
    }

}
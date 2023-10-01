import { validate } from "class-validator";
import { Loan } from "../domain/entities/loans";
import { LoanRepository } from "../domain/repositories/loansRepository";
import { ValidationIdLoan } from "../domain/validations/validationsLoans";

export class UpdateLoanUseCase {
    constructor(readonly loanRepository: LoanRepository) {}
  
    async updateLoan(id: number,newUser?: { loan?: string; delivery?: string; status?: boolean; } ): Promise<Loan | null> {
      let valitationPost = new ValidationIdLoan(id);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
        throw new Error(JSON.stringify(validation));
        }
      try {
        const updateLoan = await this.loanRepository.updateLoan(id,newUser)
        return updateLoan;
      } catch (error) {
        return null;
      }
    }

}
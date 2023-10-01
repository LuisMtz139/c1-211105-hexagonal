import { LoanRepository } from "../domain/repositories/loansRepository";


export class DeleteLoanUseCase {
    constructor( readonly loanRepository: LoanRepository) {}

    async run(loanId: string): Promise<boolean> {
        try {
            // Assuming deleteUser returns a boolean indicating success
            const loanDelete = await this.loanRepository.deleteLoan(loanId)
            return loanDelete;
        } catch (error) {
            return false;
        }
    }
}
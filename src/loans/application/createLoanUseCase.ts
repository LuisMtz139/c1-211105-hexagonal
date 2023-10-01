import { validate } from "class-validator";
import { Loan } from "../domain/entities/loans";
import { LoanRepository } from "../domain/repositories/loansRepository";
import { ValidationCreateLoan } from "../domain/validations/validationsLoans";
import { Request, Response } from "express";

export class CreateLoanUseCase {
    constructor(readonly loanRepository: LoanRepository) {}

    async run(
        loan: string,
        delivery: string,
        status: boolean,
        id_Book: number,
        id_User: number
    ): Promise<Loan | null> {
        let validationPost = new ValidationCreateLoan(
            loan,
            delivery,
            status,
            id_Book,
            id_User
        );

        const validation = await validate(validationPost);

        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const createdLoan = await this.loanRepository.createLoan(
                loan,
                delivery,
                status,
                id_Book,
                id_User
            );
            return createdLoan;
        } catch (error) {
            console.error("Error creating loan:", error);
            return null;
        }
    }
}

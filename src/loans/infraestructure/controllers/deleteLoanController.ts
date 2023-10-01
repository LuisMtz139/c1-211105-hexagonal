import { DeleteLoanUseCase } from "../../application/deleteLoanUseCase";
import { Request, Response } from "express";





export class DeleteLoanController{
    constructor(
         readonly deleteLoanUseCase: DeleteLoanUseCase,
    ) {}

    async deleteLoan(req: Request, res: Response) {
        try {
            const loanId = req.params.loanId; // Assuming userId is in the URL params
            const loanDelete = await this.deleteLoanUseCase.run(loanId)

            if (loanDelete) {
                return res.status(200).json({
                    status: "success",
                    message: "Usuario eliminado"
                });
            }

            return res.status(404).json({
                status: "error",
                message: "no se puede eliminar"
            });
        } catch (error) {
            console.error('Error deleting :', error);
            return res.status(500).json({
                status: "error",
                message: "Error inesperado porfavor intente de nuevo"
            });
        }
    }

}
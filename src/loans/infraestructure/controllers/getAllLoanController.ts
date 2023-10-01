import { GetAllLoanUseCase } from "../../application/getAllLoanUseCase";
import { Request, Response } from "express";


export class GetAllLoanController{
    constructor(
         readonly getAllLoanUseCase: GetAllLoanUseCase,
    ) {}

    async getAllLoan(req: Request, res: Response) {
        try {
          const loan = await this.getAllLoanUseCase.getAllLoan();
          
          if (loan && loan.length > 0) {
            return res.status(200).json({
              status: 'success',
              data: loan,
              message: 'Lista de Loan Exitosamente',
            });
          }
    
          return res.status(404).json({
            status: 'error',
            message: 'No se encontraron Loan',
          });
        } catch (error) {
          console.error('Error retrieving user list:', error);
          return res.status(500).json({
            status: 'error',
            message: 'Error inesperado, por favor inténtelo de nuevo',
          });
        }
      }
    }
import { UpdateLoanUseCase } from "../../application/updateLoanUseCase";
import { Request, Response } from "express";

export class UpdateLoanController {
    constructor(
      private readonly updateLoanUseCase: UpdateLoanUseCase
    ) {}
  
    async updateLoan(req: Request, res: Response) {
      try {
        const {
          id,
          loan,
          delivery,
          status,

        } = req.body;
  
        // Aquí se llama al caso de uso para actualizar el usuario con todos los campos
        const updateLoan = await this.updateLoanUseCase.updateLoan(id, {
          loan,
          delivery,
          status,

        });
  
        if (updateLoan) {
          return res.status(200).json({
            status: "success",
            data: {
              update_loan: updateLoan
            }
          });
        } else {
          return res.status(404).json({
            status: "error",
            message: `No se pudo encontrar ID ${id}`
          });
        }
      }catch (error) {
        if (error instanceof Error) {
  
          if (error.message.startsWith('[')) {
            
            return res.status(400).send({
              status: "error",
              message: "Validation failed",
              errors: JSON.parse(error.message)
            });
          }
        }
        return res.status(500).send({
          status: "error",
          message: "An error occurred while adding the book."
        });
      }
    }
  }
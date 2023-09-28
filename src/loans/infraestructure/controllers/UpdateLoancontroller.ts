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
          prestamo,
          entrega,
          estado,
        } = req.body;
  
        // Aquí se llama al caso de uso para actualizar el usuario con todos los campos
        const updateLoan = await this.updateLoanUseCase.updateLoan(id, {
          prestamo,
          entrega,
          estado 
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
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Error al actualizar"
        });
      }
    }
  }
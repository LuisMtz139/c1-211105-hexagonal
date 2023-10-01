import { UpdateBookLeadUseCase } from "../../application/updateBookLoadedUseCase";
import { Request, Response } from "express";


export class UpdateBookLeadController {
    constructor(private readonly updateBookLeadUseCase: UpdateBookLeadUseCase) {}
  
    async updateBookLead(req: Request, res: Response) {
      try {
        const { id} = req.params;
  
        // Verifica si id y is_loaded están presentes en la solicitud
        const updateBookLead = await this.updateBookLeadUseCase.updateLoaded(Number(id))
        if (updateBookLead.book) {
          return res.status(200).json({ success: true, message: 'Valor "status" actualizado a false.', book: updateBookLead.book });
        }  
        else if(updateBookLead.book){  res.status(200).json({ success: false, message: 'Valor "status" actualizado a false.', book: updateBookLead });
        } else {
          res.status(404).json({ success: true, message: 'La revisión con el ID especificado no fue encontrada.' });
        }
        
      } catch (error) {
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
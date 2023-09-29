import { Request, Response } from "express";
import { PrestarBookUseCase } from "../../application/prestarBookUseCase";


export class PrestarBookController {
    constructor(private readonly prestarBookUseCase: PrestarBookUseCase) {}
  
    async prestarBook(req: Request, res: Response) {
      try {
        const { id} = req.params;
  
        // Verifica si id y is_loaded están presentes en la solicitud
        const updateBookLead = await this.prestarBookUseCase.prestarBook(Number(id))
        if (updateBookLead.book) {
          return res.status(200).json({ success: true, message: 'Valor "status" actualizado a false.', book: updateBookLead.book });
        }  
        else if(updateBookLead.book){  res.status(200).json({ success: false, message: 'Valor "status" actualizado a false.', book: updateBookLead });
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
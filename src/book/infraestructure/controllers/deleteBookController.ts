import { Request, Response } from "express";
import { DeleteBookUseCase } from "../../application/deleteBookUseCase";

export class DeleteBookController {
    constructor(readonly deleteBookUseCase: DeleteBookUseCase) {}
  
    async deleteBook(req: Request, res: Response) {
      try {
        const id = Number(req.params.id);
    
    
        const deleted = await this.deleteBookUseCase.deleteBook(id);
    
        if (deleted !== null) { // Verifica explícitamente si deleted no es null
          return res.status(200).send({
            status: "success",
            data: {},
            message: "El libro se ha eliminado exitosamente",
          });
        } else {
          return res.status(404).send({
            status: "error",
            data: [],
            message: "No se encontró un libro con el ID especificado",
          });
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

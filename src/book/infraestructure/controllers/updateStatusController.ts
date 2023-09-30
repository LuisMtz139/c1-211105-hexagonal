import { Response, Request } from "express";
import { UpdateStatusUseCase } from "../../application/updateStatusUseCase";


export class UpdateStatusController {
    constructor(readonly updateStatusUseCase: UpdateStatusUseCase) {}
  
    async updateStatus(req: Request, res: Response) {
      try {
        const {id} = req.params;
        // Llama al caso de uso para actualizar el estado del libro
        const updatedBook = await this.updateStatusUseCase.updateStatus(Number(id));

        if (updatedBook.book) {
          return res.status(200).json({ success: true, message: 'Valor "status" actualizado a false.', book: updatedBook.book });
        } else if (updatedBook.message) {
          return res.status(200).json({ success: true, message: updatedBook.message, book: null });
        } else {
          return res.status(404).json({ success: false, message: 'La revisión con el ID especificado no fue encontrada.' });
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
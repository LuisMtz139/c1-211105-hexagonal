import { Request, Response } from "express";
import { EscribirResenaUseCase } from '../../application/writeReseUseCase';

export class EscribirResenaController {
  constructor(private readonly escribirResenaUseCase: EscribirResenaUseCase) {}

  async escribirResena(req: Request, res: Response) {
    try {
      const { userId, bookId, reviewText } = req.body;  // Assuming userId, bookId, and reviewText are sent in the request body

      // Escribir la reseña
      const success = await this.escribirResenaUseCase.run(userId, bookId, reviewText);

      if (success) {
        return res.status(201).send({
          status: "success",
          data: {
            userId,
            bookId,
            reviewText,
          },
          message: "Reseña guardada correctamente."
        });
      }

      res.status(400).send({
        status: "error",
        data: [],
        message: "Error al escribir la reseña. Asegúrate de que el usuario ha prestado y devuelto el libro."
      });
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

import { Request, Response } from "express";
import { EscribirResenaUseCase } from '../../application/escribirResenaUseCase';

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
      console.error('Error al escribir la reseña:', error);
      res.status(500).send({
        status: "error",
        data: [],
        message: "Error interno del servidor al escribir la reseña."
      });
    }
  }
}

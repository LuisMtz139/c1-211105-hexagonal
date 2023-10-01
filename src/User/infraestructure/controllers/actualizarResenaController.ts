import { Request, Response } from "express";
import { ActualizarResenaUseCase } from "../../application/updateReseUseCase";

export class ActualizarResenaController {
  constructor(
     readonly actualizarResenaUseCase: ActualizarResenaUseCase
  ) {}

  async actualizarResena(req: Request, res: Response) {
    try {
      const { userId, bookId, updatedReview } = req.body;

      if (!userId || !bookId || !updatedReview) {
        return res.status(400).json({
          status: "error",
          message: "Se requieren userId, bookId y updatedReview para actualizar la reseña."
        });
      }

      const result = await this.actualizarResenaUseCase.actualizarResena(
        userId,
        bookId,
        updatedReview
      );

      if (result) {
        return res.status(200).json({
          status: "success",
          message: "Reseña actualizada correctamente."
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "No se pudo actualizar la reseña. Asegúrate de que la reseña existe y pertenece al usuario y libro indicados."
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


import { Request, Response } from "express";
import { GetReviewByIdUserUseCase } from "../../application/getReviewByIdUserUseCase";

export class GetReviewByUserController {
    constructor(private readonly getReviewByIdUserUseCase: GetReviewByIdUserUseCase) {}
  
    async getReviewUser(req: Request, res: Response) {
      try {
        const { id_User } = req.params;
  
        if (!id_User) {
          return res.status(400).json({
            status: "error",
            data: [],
            message: "El campo 'id_User' es requerido en la solicitud.",
          });
        }
  
        const reviews = await this.getReviewByIdUserUseCase.getReviewByUser(Number(id_User));
  
        if (reviews) {
          return res.status(200).json({
            status: "success",
            data: reviews,
            message: "Lista de reseñas del usuario obtenida exitosamente",
          });
        } else {
          return res.status(404).json({
            status: "error",
            data: [],
            message: "No se encontraron reseñas para el usuario especificado",
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
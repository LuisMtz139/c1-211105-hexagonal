import { Response, Request } from "express";
import { UpdateStatusUseCase } from "../../application/updateStatusBookUseCase";


export class UpdateStatusController {
    constructor(readonly updateStatusUseCase: UpdateStatusUseCase) {}
  
    async updateStatus(req: Request, res: Response) {
      try {
        const {id, newStatus } = req.body;
  
        // Verifica si bookId y newStatus están presentes en la solicitud
        if (!id || !newStatus) {
          return res.status(400).send({
            status: "error",
            data: [],
            validations: [],
            message: "bookId y newStatus son campos requeridos en la solicitud.",
          });
        }
  
        // Llama al caso de uso para actualizar el estado del libro
        const updatedBook = await this.updateStatusUseCase.updateStatus(
          id,
          newStatus
        );
  
        if (updatedBook) {
          return res.status(200).send({
            status: "success",
            data: {
              id: updatedBook.id,
              title: updatedBook.title,
              author: updatedBook.author,
              img_url: updatedBook.img_url,
              status: updatedBook.status,
              is_loaded: updatedBook.is_loaded,
            },
            message: "El estado del libro se ha actualizado exitosamente",
          });
        } else {
          res.status(400).send({
            status: "error",
            data: [],
            validations: [],
            message: "Error al actualizar el estado del libro, el libro no existe o ocurrió un error.",
          });
        }
      } catch (error) {
        console.error("Error al actualizar el estado del libro:", error);
        return res.status(500).send({
          status: "error",
          data: [],
          validations: [],
          message: "Ocurrió un error interno al actualizar el estado del libro.",
        });
      }
    }
  }
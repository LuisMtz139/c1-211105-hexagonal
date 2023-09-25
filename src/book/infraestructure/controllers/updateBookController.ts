import { Request, Response } from "express";
import { UpdateBookUseCase } from "../../application/updateBookUseCase";


export class UpdateBookController {
    constructor(private readonly updateBookUseCase: UpdateBookUseCase) {}
  
    async updateBook(req: Request, res: Response) {
      try {
        const { id, is_loaded } = req.body;
  
        // Verifica si id y is_loaded están presentes en la solicitud
        if (!id || is_loaded === undefined) {
          return res.status(400).send({
            status: "error",
            data: [],
            validations: [],
            message: "id y is_loaded son campos requeridos en la solicitud.",
          });
        }
  
        const updatedBook = await this.updateBookUseCase.upadateBook(
          id,
          is_loaded
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
            message: "El campo 'is_loaded' del libro se ha actualizado exitosamente",
          });
        } else {
          res.status(400).send({
            status: "error",
            data: [],
            validations: [],
            message:
              "Error al actualizar el campo 'is_loaded' del libro, el libro no existe o ocurrió un error.",
          });
        }
      } catch (error) {
        console.error("Error al actualizar el campo 'is_loaded' del libro:", error);
        return res.status(500).send({
          status: "error",
          data: [],
          validations: [],
          message:
            "Ocurrió un error interno al actualizar el campo 'is_loaded' del libro.",
        });
      }
    }
  }
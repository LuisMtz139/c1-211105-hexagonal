import { UpdateBookUseCase } from "../../application/updateBookUseCase";
import { Response, Request } from "express";

export class UpdateBookController {
    constructor(private readonly updateBookUseCase: UpdateBookUseCase) {} // Deja solo el caso de uso de actualización
  
    async update(req: Request, res: Response) {
      try {
        const { id } = req.params; // Supongo que el ID del libro se pasa como un parámetro de la URL
        const { title, author, img_url, status, is_loaded } = req.body;
  
  
        // Verificar si el libro existe antes de actualizarlo
        const updatedBook = await this.updateBookUseCase.update(
          Number(id),
          title,
          author,
          img_url,
          status,
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
            message: "El libro ha sido actualizado exitosamente",
          });
        } else {
          res.status(400).send({
            status: "error",
            data: [],
            validations: [],
            message: "Error al actualizar el libro, inténtalo más tarde",
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
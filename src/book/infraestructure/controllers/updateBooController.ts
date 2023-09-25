import { Response, Request } from "express";
import { UpdateBokUseCase } from "../../application/updateBoksUserCase";

export class UpdateBooController {
    constructor(private readonly updateBokUseCase: UpdateBokUseCase) {} // Deja solo el caso de uso de actualización
  
    async update(req: Request, res: Response) {
      try {
        const { id } = req.params; // Supongo que el ID del libro se pasa como un parámetro de la URL
        const { title, author, img_url, status, is_loaded } = req.body;
  
        // Verificar si algún campo requerido está vacío o nulo
        if (!title || !author || !img_url || status === undefined || is_loaded === undefined) {
          return res.status(400).send({
            status: "error",
            data: [],
            validations: [],
            message: "Deben de llamarse todos los campos",
          });
        }
  
        // Verificar si el libro existe antes de actualizarlo
        const updatedBook = await this.updateBokUseCase.update(
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
            message: "El libro se ha actualziado ",
          });
        } else {
          res.status(400).send({
            status: "error",
            data: [],
            validations: [],
            message: "Error al actualizar",
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send({
          status: "error",
          data: [],
          validations: [],
          message: "Error internor",
        });
      }
    }
  }
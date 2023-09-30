import { GetBooksUseCase } from "../../application/getBookUseCase";
import { Response,Request } from "express";

export class GetBooksController {
    
    constructor (readonly getBooksUseCase : GetBooksUseCase){}

    async getAll(req:Request, res:Response){
        try {
            const books = await this.getBooksUseCase.getAll();
            if (books) {
              return res.status(200).json({
                status: "success",
                data: books,
                message: "Lista de libros obtenida exitosamente",
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
                message: "No se encontraron libros",
              });
            }
          } catch (error) {
            return res.status(500).json({
              status: "error",
              data: [],
              message: "Error al obtener la lista de libros",
            });
          }
        }
}

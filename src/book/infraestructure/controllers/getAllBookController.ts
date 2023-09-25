import { Response,Request } from "express";
import { GetAllBookUseCase } from "../../application/getAllBookUseCase";


export class GetAllBookController {
    
    constructor (readonly getAllBookUseCase : GetAllBookUseCase){}

    async getAllBook(req:Request, res:Response){
        try {
            const books = await this.getAllBookUseCase.getAllBook();
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
import { Response,Request } from "express";
import { GetBookByIdUseCase } from "../../application/getBookByIdUseCase";


export class GetBookByIdController{

    constructor (readonly getBookUseCase : GetBookByIdUseCase){}

    async getBook(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            const books = await this.getBookUseCase.getBook(id);
            
            if (books) {
              return res.status(200).json({
                status: "success",
                data: books,
                message: "Lista de librosss",
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
                message: "No se encontraron libros por usuario",
              });
            }
          } catch (error) {
            return res.status(500).json({
              status: "error",
              data: [],
              message: "Error al obtener libro by user",
            });
          }
    }
}
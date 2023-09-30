import { Response,Request } from "express";
import { GetBookByIdUseCasa } from "../../application/getBookByIdUseCase";


export class GetBookByIdController{

    constructor (readonly getBookUseCase : GetBookByIdUseCasa){}

    async getBookById(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            const books = await this.getBookUseCase.getBookById(id);
            
            if (books) {
              return res.status(200).json({
                status: "success",
                data: books,
                message: "Lista de libros por usuario obtenida exitosamente",
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
                message: "No se encontraron reseñas por usuario",
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
import { Response,Request } from "express";
import { ObtenerBookByIdUseCase } from "../../application/obtenerBookByIdUseCase";


export class ObtenerBookByIdController{

    constructor (readonly obtenerBookById : ObtenerBookByIdUseCase){}

    async obtenerBookByIdBookController(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            const books = await this.obtenerBookById.obtenerBookByid(id);
            
            if (books) {
              return res.status(200).json({
                status: "success",
                data: books,
                message: "Lista de book by id",
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
                message: "No se encontraron book",
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
              message: "Se produjo un error al agregar el libro."
            });
          }
    }
}
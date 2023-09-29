import { Response,Request } from "express";
import { ObtenerBookUseCase } from "../../application/obtenerBookUseCase";


export class ObtenerBookController {
    
    constructor (readonly obtenerBookUseCase : ObtenerBookUseCase){}

    async obetenreBook(req:Request, res:Response){
        try {
            const books = await this.obtenerBookUseCase.obtenerBook();
            if (books) {
              return res.status(200).json({
                status: "success",
                data: books,
                message: "se obtuvieron todos los books",
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
                message: "No se encontraron",
              });
            }
          } catch (error) {
            return res.status(500).json({
              status: "error",
              data: [],
              message: "Error al obtener book",
            });
          }
        }
}
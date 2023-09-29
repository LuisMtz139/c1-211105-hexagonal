import { GetBookInactiveUseCase } from "../../application/getInactiveBookUseCase";
import { Response, Request } from "express";


export class GetInactiveBookController {
    constructor(readonly GetBookInactiveUseCase: GetBookInactiveUseCase) {}
  
    async getBookInactive(req: Request, res: Response) {
      try {
        const status = false; 
        const inactiveBooks = await this.GetBookInactiveUseCase.getInactive(status);
  
        if (inactiveBooks) {
          return res.status(200).json({
            status: "success",
            data: inactiveBooks,
            message: "lista de libros con exito",
          });
        } else {
          return res.status(404).json({
            status: "error",
            data: [],
            message: "No se obtuvieron",
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
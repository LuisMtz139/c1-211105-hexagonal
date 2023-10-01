import { Response,Request } from "express";
import { GetLoanByIdUseCase } from "../../application/getLoanByIdUseCase";


export class GetLoanByIdController{

    constructor (readonly getLoanByIdUseCase : GetLoanByIdUseCase){}

    async getLoanById(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            const idLoan = await this.getLoanByIdUseCase.getLoanId(id)
            
            if (idLoan) {
              return res.status(200).json({
                status: "success",
                data: idLoan,
                message: "Lista de libros por usuario obtenida exitosamente",
              });
            } else {
              return res.status(404).json({
                status: "error",
                data: [],
                message: "No se encontraron libros por usuario",
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
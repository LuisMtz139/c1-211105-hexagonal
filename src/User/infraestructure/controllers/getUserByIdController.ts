import { Response,Request } from "express";
import { GetUserByIdUseCase } from "../../application/getUserByIdUseCase";

export class GetUserByIdController{

    constructor (readonly getUserByIdUseCase : GetUserByIdUseCase){}

    async getUserId(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            const iduser = await this.getUserByIdUseCase.getUserId(id);
            
            if (iduser) {
              return res.status(200).json({
                status: "success",
                data: iduser,
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
            return res.status(500).json({
              status: "error",
              data: [],
              message: "Error al obtener la lista de libros por usuario",
            });
          }
    }
}
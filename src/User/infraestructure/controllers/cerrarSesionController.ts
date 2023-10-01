import { Request, Response } from "express";
import { ActiveUserUseCase } from '../../application/activeUserUseCase';
import { CerarSesionUseCase } from "../../application/singOffUseCase";



export class CerrarSesionController {
    constructor(readonly CerarSesionUseCase : CerarSesionUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                id,
            } = req.body
        
            let cerrarSesion = await this.CerarSesionUseCase.run(id)

            if(cerrarSesion){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        cerrarSesion
                    }
                })
            }
            if (!cerrarSesion) {
                return res.status(404).send({
                    status: "error",
                    message: "no se ha podido cerrar sesion"
                });
            }
        }catch (error) {   
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



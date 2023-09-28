import { Request, Response } from "express";
import { ActiveUserUseCase } from '../../application/activeUserUseCase';
import { CerarSesionUseCase } from "../../application/cerrarSesionUseCase";



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
        } catch (error) {   
            return res.status(500).send({
                status: "error",
                message: "No es posible cerar sesion"
            });
        }
    }
}



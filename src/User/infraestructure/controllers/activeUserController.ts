import { AddUserUseCase } from '../../application/addUsersUseCase';
import { Request, Response } from "express";
import { DeleteUserUseCase } from '../../application/deleteUsersUseCase';
import { ListAllUserUseCase } from '../../application/listAllUsersUseCase';
import { ActiveUserUseCase } from '../../application/activeUserUseCase';



export class ActiveUserController {
    constructor(readonly activeUserUseCase : ActiveUserUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                id,
            } = req.body
        
            let activeUser = await this.activeUserUseCase.run(id)

            if(activeUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        activeUser
                    }
                })
            }
            if (!activeUser) {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontro el id."
                });
            }
        } catch (error) {   
            return res.status(500).send({
                status: "error",
                message: "No se pudo activar"
            });
        }
    }
}



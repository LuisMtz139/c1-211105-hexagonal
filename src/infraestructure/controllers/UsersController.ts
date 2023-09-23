import { AddUserUseCase } from '../../application/addUsersUseCase';
import { Request, Response } from "express";


export class UsersContoller{
    constructor(readonly AddUserUseCase: AddUserUseCase){}

    async run(req:Request, res:Response){
        try{
            let {name,password, email, status} = req.body;
            let createUser = await this.AddUserUseCase.run(name,password,email,status);

            if (createUser) {
                return res.status(201).send({
                    status:"success",
                    data:{
                        id:createUser.id,
                        name:createUser.name,
                        password:createUser.password,
                        email:createUser.email,
                        status:createUser.status,
                    },
                    message:"El usuario se a creado con exito ha sido creado exitosamente"
                });
            }
            res.status(400).send({
                status:"error",
                data:[],
                //TODO: implementar validaciones
                validations:[],
                message:"Errosr al crear un usuario nuevo, intentalo mas tarde"
            });



        }catch(error){
            return null;
        }
    }
}
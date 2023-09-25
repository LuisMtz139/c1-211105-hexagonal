import { AddUserUseCase } from '../../application/addUsersUseCase';
import { Request, Response } from "express";
import { DeleteUserUseCase } from '../../application/deleteUsersUseCase';
import { ListAllUserUseCase } from '../../application/listAllUsersUseCase';


export class AddUserContoller{
    constructor(
         readonly addUserUseCase: AddUserUseCase,

    ) {}

    async addUser(req:Request, res:Response){
        try{
            let {name,password, email, status} = req.body;
            let createUser = await this.addUserUseCase.run(name,password,email,status);

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
                    message:"Creado"
                });
            }
            res.status(400).send({
                status:"error",
                data:[],
                //TODO: implementar validaciones
                validations:[],
                message:"Error al crear"
            });



        }catch(error){
            return null;
        }
    }

}
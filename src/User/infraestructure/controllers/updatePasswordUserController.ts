import { Request, Response } from "express";
import { ListAllUserUseCase } from '../../application/listAllUsersUseCase';
import { UpdatePasswordUserUseCase } from "../../application/updatePasswordUserUseCase";




export class UpdatePasswordUserController {
    constructor(
        readonly updatePasswordUserUseCase: UpdatePasswordUserUseCase,
   ) {}

   async updatePassword(req:Request, res:Response) {
    try {

        let {
            id,
            password,
        } = req.body
    
        let updatePasswordUser = await this.updatePasswordUserUseCase.updatePassword(id,password);

        if(updatePasswordUser){
            return res.status(200).send({
                status:"succes",
                data:{
                    update_user: updatePasswordUser
                }
            })
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
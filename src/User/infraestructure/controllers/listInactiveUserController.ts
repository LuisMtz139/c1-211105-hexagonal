import { ListInactiveUserUseCase } from "../../application/listUserInactiveUseCase"
import { Request, Response } from "express";


export class ListInactiveUserController {
    constructor(
        readonly listInactiveUserUseCase: ListInactiveUserUseCase,

   ) {}
   
   async run(req:Request, res:Response) {
        try {
            let userInactives = await this.listInactiveUserUseCase.run()

            if(userInactives){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        userInactives
                    }
                })
            }
        } 
        catch (error) {   
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
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
            return null; 
        }
    }
}
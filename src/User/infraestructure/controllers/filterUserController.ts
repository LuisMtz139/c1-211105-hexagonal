import { FilterUserUseCase } from "../../application/filterUserUseCase";
import { Request, Response } from "express";


  export class FilterUserController {
    constructor(readonly filterUserUseCase: FilterUserUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                filter,
                name,
                email,
            } = req.query
            let getUserByFilter = await this.filterUserUseCase.run(filter as string, email as string, name as string)

            if(getUserByFilter){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        getUserByFilter
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

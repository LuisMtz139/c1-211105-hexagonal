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
        } catch (error) {   
        }
    }
}

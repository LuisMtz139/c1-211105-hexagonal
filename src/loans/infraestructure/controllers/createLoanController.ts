import { Request, Response } from "express";
import { CreateLoanUseCase } from "../../application/createLoanUseCase";


export class CreateLongController{
    constructor(
         readonly createLoanUseCase: CreateLoanUseCase,

    ) {}

    async createLonn(req:Request, res:Response){
        try{
            let {loan,delivery,status,id_Book,id_User} = req.body;
            let createUser = await this.createLoanUseCase.run(loan,delivery,status, id_Book,id_User );

            if (createUser) {
                return res.status(201).send({
                    status:"success",
                    data:{
                        loan:createUser.loan,
                        status:createUser.status,
                        id_Book:createUser.id_Book,
                        id_User:createUser.id_User,
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
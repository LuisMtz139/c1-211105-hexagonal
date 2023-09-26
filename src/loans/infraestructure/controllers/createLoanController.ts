import { Request, Response } from "express";
import { CreateLonUseCase } from "../../application/createLoanUseCase";


export class CreateLongController{
    constructor(
         readonly createLongUseCase: CreateLonUseCase,

    ) {}

    async createLong(req:Request, res:Response){
        try{
            let {prestamo,entrega, estado,id_Book,id_User} = req.body;
            let createLong = await this.createLongUseCase.run(prestamo,entrega,estado, id_Book,id_User)

            if (createLong) {
                return res.status(201).send({
                    status:"success",
                    data:{
                        id:createLong.id,
                        prestamo:createLong.prestamo,
                        entrega:createLong.entrega,
                        estado:createLong.estado,
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
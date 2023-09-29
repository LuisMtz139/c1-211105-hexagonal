import { CreateReviewUseCase } from "../../application/createReviewUseCase";
import { Request, Response } from "express";


export class CreateReviewController{
    constructor(readonly createReviewUseCase: CreateReviewUseCase){}

    async createReviewController( req:Request, res:Response){
        try {

            let {id_user,id_book,review_text,status} = req.body;

            let createReview = await this.createReviewUseCase.run(id_user,id_book,review_text,status)

            if(createReview){
                return res.status(201).send({
                    status:"Sucess",
                    data:{
                        id:createReview.id,
                        id_user: createReview.id_user,
                        id_book:createReview.id_book,
                        review_text:createReview.review_text,
                        status:createReview.status
                    },
                    message:"Creado review"
                });

            }
            res.status(400).send({
                status: "error",
                data: [],
                validations: [],
                message: "Error al crear.",
            });
            
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                data: [],
                validations: [],
                message: "Error interno del servidor",
            });
            
        }
        
        


    }
}
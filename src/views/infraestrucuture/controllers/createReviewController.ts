import { CreateReviewUseCase } from "../../application/createReviewUseCase";
import { Request, Response } from "express";


export class CreateReviewController{
    constructor(readonly createReviewUseCase: CreateReviewUseCase){}


        async createReviewController(req: Request, res: Response) {
            try {
        
              let { id_user, id_book, review_text, status } = req.body;
        
              const CreateView = await this.createReviewUseCase.run( id_user, id_book, review_text, status, )
              if (CreateView) {
                return res.status(201).send({
                  status: "success",
                  data: {id: CreateView.id,id_user: CreateView.id_user,author: CreateView.id_book,id_book: CreateView.id_book,review_text: CreateView.review_text,status: CreateView.status,},
                  message: "Creacion correcta",
                });
              } else {
                res.status(400).send({
                  status: "error",
                  data: [],
                  validations: [],
                  message: "Error al crear ",
                });
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
    

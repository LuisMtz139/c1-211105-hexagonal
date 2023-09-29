import { GetReviewByIdUseCase } from "../../application/getReviewByIdUseCase";
import { Request, Response } from "express";


export class GetReviewByIdController{
    constructor ( readonly getReviewByIdUseCase: GetReviewByIdUseCase){}

    async getReviewById(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            const review = await this.getReviewByIdUseCase.getReviewById(id);
            if (review) {
                return res.status(200).json({
                  status: "success",
                  data: review,
                  message: "obtenida",
                });
              } else {
                return res.status(404).json({
                  status: "error",
                  data: [],
                  message: "No se se pudo encontrar la review",
                });
              }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                data: [],
                message: "Error al obtener el review",
              });
        }
    }
}
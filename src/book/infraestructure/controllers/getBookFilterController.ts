import { GetBookFilterUseCase } from "../../application/getBookFilterUseCase";
import { Request, Response } from "express";



export class GetBookFilterController{
    constructor ( readonly getBookFilterUseCase : GetBookFilterUseCase){}

    async bookFilter(req: Request, res: Response) {
        try {
            let {
                filter,
                title,
                author
            } = req.query;
            const getFilter = await this.getBookFilterUseCase.fliterBook(filter as string, title as string, author as string)
            if (getFilter) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        getFilter
                    }
                })
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron resultados."
                });
            }
        } catch (error) {
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
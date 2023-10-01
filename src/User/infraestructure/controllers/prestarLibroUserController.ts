import { PrestarLibroUseCase } from '../../application/lendBookUseCase';
import { Request, Response } from "express";

export class PrestarLibroController {
    constructor(
        private readonly prestarLibroUseCase: PrestarLibroUseCase,
    ) {}

    async prestarLibroUser(req: Request, res: Response) {
        try {
            const {userId, bookId} = req.body;

            const load = await this.prestarLibroUseCase.run  (userId, bookId);

            if (load === "Libro prestado exitosamente.") {
                return res.status(201).send({
                    status: "success",
                    data: load,
                    message: load
                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    message: load
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

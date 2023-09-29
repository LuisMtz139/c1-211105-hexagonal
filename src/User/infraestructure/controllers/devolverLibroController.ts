import { DevolverLibroUseCase } from '../../application/devolverLibroUseCase';
import { Request, Response } from "express";

export class DevolverLibroController {
    constructor(
        private readonly devolverLibroUseCase: DevolverLibroUseCase,
    ) {}

    async devolverLibroUser(req: Request, res: Response) {
        try {
            const { userId, bookId } = req.body; // Supongamos que recibes el ID del usuario y el ID del libro desde la solicitud

            if (!userId || !bookId) {
                return res.status(400).send({
                    status: "error",
                    message: "Se requieren los campos 'userId' y 'bookId' en la solicitud."
                });
            }

            const result = await this.devolverLibroUseCase.run(userId, bookId);

            if (result === "Libro devuelto exitosamente.") {
                return res.status(200).send({
                    status: "success",
                    data: [],
                    message: result
                });
            } else {
                return res.status(400).send({
                    status: "error",
                    data: [],
                    message: result
                });
            }
        } catch (error) {
            console.error('Error al devolver el libro:', error);
            return res.status(500).send({
                status: "error",
                data: [],
                message: "Error interno al devolver el libro."
            });
        }
    }
}

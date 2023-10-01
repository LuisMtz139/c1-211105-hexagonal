import { GetBookReviewUseCase } from "../../application/getBookReviewUseCase";
import { Response, Request } from "express";


export class GetBookReviewsController {
    constructor(private readonly getBookReviewUseCase: GetBookReviewUseCase) {}

    async getAll(req: Request, res: Response) {
        try {
            const booksReviews = await this.getBookReviewUseCase.getReviewsBooks();

            if (booksReviews) {
                return res.status(200).json({
                    status: "success",
                    data: booksReviews,
                    message: "Lista de libros con reseñas obtenida exitosamente",
                });
            } else {
                return res.status(404).json({
                    status: "error",
                    data: [],
                    message: "No se encontraron libros con reseñas",
                });
            }
        } catch (error) {
            console.error("Error al obtener la lista de libros con reseñas:", error);
            return res.status(500).json({
                status: "error",
                data: [],
                message: "Error interno al obtener la lista de libros con reseñas",
            });
        }
    }
}
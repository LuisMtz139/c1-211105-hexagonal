import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";

export class GetBookReviewUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async getReviewsBooks(): Promise<Book[] | null> {
        try {
            const booksReviews = await this.bookRepository.getBookReview();
            return booksReviews || [];
        } catch (error) {
            console.error("Error al obtener la lista de libros con reseñas:", error);
            return null;
        }
    }
}
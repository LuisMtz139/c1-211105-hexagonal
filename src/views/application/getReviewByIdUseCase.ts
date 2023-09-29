import { Review } from "../domain/entities/review";
import { ReviewRepository } from "../domain/repositories/reviewRepository";

export class GetReviewByIdUseCase{
    constructor (readonly reviewRepository: ReviewRepository){}

    async getReviewById(id:number):Promise<Review |Review[]| null>{
        try {
            return this.reviewRepository.getReviewById(id);
        } catch (error) {
            console.error("Error al obtener la reseña:", error);
            return null;
        }
    }
}
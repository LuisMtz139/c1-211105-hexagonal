import { validate } from "class-validator";
import { Review } from "../domain/entities/review";
import { ReviewRepository } from "../domain/repositories/reviewRepository";
import { ValidationByIdViews } from "../domain/validations/validationsViews";

export class GetReviewByIdUseCase{
    constructor (readonly reviewRepository: ReviewRepository){}

    async getReviewById(id:number):Promise<Review |Review[]| null>{
        let valitationPost = new ValidationByIdViews(id);
            const validation = await validate(valitationPost)
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
        try {
            return this.reviewRepository.getReviewById(id);
        } catch (error) {
            console.error("Error al obtener la reseña:", error);
            return null;
        }
    }
}
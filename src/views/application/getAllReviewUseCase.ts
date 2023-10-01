import { Review } from "../domain/entities/review";
import { ReviewRepository } from "../domain/repositories/reviewRepository";

export class GetAllReviewUseCase{
    constructor (readonly reviewRepository: ReviewRepository){}

    async getAllReviews():Promise<Review[]|null>{
        try {
            const reviews = await this.reviewRepository.getAllReview();
            return reviews;
        } catch (error) {
            return null;
        }
    }

}
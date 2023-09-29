import { Review } from "../domain/entities/review";
import { ReviewRepository } from "../domain/repositories/reviewRepository";



export class CreateReviewUseCase{
    constructor(readonly reviewRepository:ReviewRepository){}

    async run(
        id_user:number,
        id_book:number,
        review_text:string,
        status:boolean

    ):Promise<Review | null>{
        try {
            const createUser = await this.reviewRepository.createReview(
                id_user,
                id_book,
                review_text,
                status
            )
            return createUser;
        } catch (error) {
            return null
        }
    }
}
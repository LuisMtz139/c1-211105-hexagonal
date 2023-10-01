import { validate } from "class-validator";
import { Review } from "../domain/entities/review";
import { ReviewRepository } from "../domain/repositories/reviewRepository";
import { ValidationCreateViews } from "../domain/validations/validationsViews";



export class CreateReviewUseCase{
    constructor(readonly reviewRepository:ReviewRepository){}

    async run(id_user: number,id_book: number,review_text: string,status: boolean): Promise<Review | null> {

        let valitationPost = new ValidationCreateViews(id_user, id_book, review_text, status);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const createBook = await this.reviewRepository.createReview(id_user, id_book, review_text, status);
            return createBook;
        } catch (error) {
            return null
        }
    }
}
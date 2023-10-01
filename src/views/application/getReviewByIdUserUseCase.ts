import { validate } from "class-validator";
import { Review } from "../domain/entities/review";
import { ReviewRepository } from "../domain/repositories/reviewRepository";
import { ValidationByIdViews } from "../domain/validations/validationsViews";


export class GetReviewByIdUserUseCase {
    constructor(private readonly reviewRepository: ReviewRepository) {}
  
    async getReviewByUser(id_User: number): Promise<Review |Review[] | null> {

      let valitationPost = new ValidationByIdViews(id_User);
            const validation = await validate(valitationPost)
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            
        try {
          const reviews = await this.reviewRepository.getReviewByUser(id_User);
          return reviews || [];
        } catch (error) {
            return null
        }
      
    }
  }
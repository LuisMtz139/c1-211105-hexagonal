import { Review } from "../domain/entities/review";
import { ReviewRepository } from "../domain/repositories/reviewRepository";


export class GetReviewByIdUserUseCase {
    constructor(private readonly reviewRepository: ReviewRepository) {}
  
    async getReviewByUser(id_User: number): Promise<Review |Review[] | null> {
        try {
          const reviews = await this.reviewRepository.getReviewByUser(id_User);
          return reviews || [];
        } catch (error) {
            return null
        }
      
    }
  }
import { validate } from "class-validator";
import { UserRepository } from "../domain/repositories/userRepository";
import { ValidationUserIdCamp } from "../domain/validations/validationsUser";

export class EliminarResenaUseCase{
    constructor(private readonly userRepository: UserRepository) {}

    async run(userId: number, reviewId: string): Promise<boolean> {
        let valitationCamp = new ValidationUserIdCamp(userId, reviewId);
        const validation = await validate(valitationCamp)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            // Assuming eliminarReseña returns a boolean indicating success
            const reviewDeleted = await this.userRepository.eliminarReseña(userId, reviewId);
            return reviewDeleted;
        } catch (error) {
            console.error("Error deleting review:", error);
            return false;
        }
    }
}

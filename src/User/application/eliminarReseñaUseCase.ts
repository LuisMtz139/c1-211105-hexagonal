import { UserRepository } from "../domain/repositories/userRepository";

export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async run(userId: number, reviewId: string): Promise<boolean> {
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

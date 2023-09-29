import { User } from "../domain/entities/user";
import { UserRepository } from "../domain/repositories/userRepository";

export class ActualizarResenaUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async actualizarResena(
    userId: number,
    bookId: number,
    updatedReview: string
  ): Promise<boolean | null> {
    try {
      const updated = await this.userRepository.actualizarResena(
        userId,
        bookId,
        updatedReview
      );
      return updated;
    } catch (error) {
      console.error("Error al actualizar la reseña:", error);
      return null;
    }
  }
}

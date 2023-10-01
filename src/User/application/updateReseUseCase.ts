import { validate } from "class-validator";
import { User } from "../domain/entities/user";
import { UserRepository } from "../domain/repositories/userRepository";
import { ValidationUserBook } from "../domain/validations/validationsUser";

export class ActualizarResenaUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async actualizarResena(
    userId: number,
    bookId: number,
    updatedReview: string
  ): Promise<boolean | null> {
    let valitationids = new ValidationUserBook(userId,bookId,updatedReview);
        const validation = await validate(valitationids)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));

        }

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

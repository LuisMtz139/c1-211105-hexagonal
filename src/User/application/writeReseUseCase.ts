import { validate } from "class-validator";
import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';
import { ValidationUserBook } from "../domain/validations/validationsUser";

export class EscribirResenaUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async run(userId: number, bookId: number, reviewText: string): Promise<boolean | null> {
        let valitationids = new ValidationUserBook(userId,bookId,reviewText);
        const validation = await validate(valitationids)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));

        }
        try {
            const escribirResenaResult = await this.userRepository.escribirResena(userId, bookId, reviewText);
            return escribirResenaResult;
        } catch (error) {
            console.error('Error al escribir la reseña:', error);
            return null;
        }
    }
}

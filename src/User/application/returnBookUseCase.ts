import { validate } from "class-validator";
import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';
import { ValidationUserBookId } from "../domain/validations/validationsUser";

export class DevolverLibroUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async run(userId: number, bookId: number): Promise<string | null> {
        let valitationids = new ValidationUserBookId(userId,bookId);
        const validation = await validate(valitationids)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));

        }
        try {
            // Lógica para devolver un libro al usuario
            const prestamoMessage = await this.userRepository.devolverLibro(userId, bookId);
            return prestamoMessage;
        } catch (error) {
            console.error("Error al devolver el libro:", error);
            return null;
        }
    }
}

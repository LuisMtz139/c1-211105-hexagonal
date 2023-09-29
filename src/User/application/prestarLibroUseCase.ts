import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';

export class PrestarLibroUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async run(userId: number, bookId: number): Promise<string | null> {
        try {
            // Lógica para prestar un libro al usuario
            const prestamoMessage = await this.userRepository.prestarLibro(userId, bookId);
            return prestamoMessage;
        } catch (error) {
            console.error("Error al prestar el libro:", error);
            return null;
        }
    }
}

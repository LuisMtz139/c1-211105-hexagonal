import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';

export class DevolverLibroUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async run(userId: number, bookId: number): Promise<string | null> {
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

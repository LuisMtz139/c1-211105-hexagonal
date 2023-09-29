import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';

export class EscribirResenaUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async run(userId: number, bookId: number, reviewText: string): Promise<boolean | null> {
        try {
            const escribirResenaResult = await this.userRepository.escribirResena(userId, bookId, reviewText);
            return escribirResenaResult;
        } catch (error) {
            console.error('Error al escribir la reseña:', error);
            return null;
        }
    }
}

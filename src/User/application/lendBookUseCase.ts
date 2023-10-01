import { validate } from "class-validator";
import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';
import { ValidationUserBookId } from "../domain/validations/validationsUser";

export class PrestarLibroUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async run(userId: number, bookId: number): Promise<string | null> {
        let valitationids = new ValidationUserBookId(userId,bookId);
        const validation = await validate(valitationids)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const load = await this.userRepository.prestarLibro(userId, bookId);
            return load;
        } catch (error) {
            console.error("Error al prestar el libro:", error);
            return null;
        }
    }
}

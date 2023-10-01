
import { validate } from "class-validator";
import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';
import { ValidationUserIdCamp } from "../domain/validations/validationsUser";


export class UpdatePasswordUserUseCase {
    constructor(readonly userRepository: UserRepository) { }

    async updatePassword(id: number, newPassword: string): Promise<User | null> {
        let valitationCamp = new ValidationUserIdCamp(id, newPassword);
        const validation = await validate(valitationCamp)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
            try {
                const updatePUserById = await this.userRepository.updatePassword(id, newPassword)
                return updatePUserById;
            } catch (error) {
                return null;
            }

        }
}
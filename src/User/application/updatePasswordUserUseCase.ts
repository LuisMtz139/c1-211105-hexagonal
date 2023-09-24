
import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';


export class UpdatePasswordUserUseCase {
    constructor(readonly userRepository: UserRepository) { }

    async updatePassword(id: number, newPassword: string): Promise<User | null> {
            try {
                const updatePUserById = await this.userRepository.updatePassword(id, newPassword)
                return updatePUserById;
            } catch (error) {
                return null;
            }

        }
}
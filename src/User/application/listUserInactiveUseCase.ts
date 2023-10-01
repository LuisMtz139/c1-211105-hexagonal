import { User } from "../domain/entities/user";
import { UserRepository } from "../domain/repositories/userRepository";

export class ListInactiveUserUseCase {
    constructor( readonly userRepository: UserRepository) {}
    
    
    async run(): Promise<User[] | User | null> {
        try {
            const listInactive = await this.userRepository.listUserInactive();
            return listInactive;
        } catch (error) {
            return null;
        }
    }
}
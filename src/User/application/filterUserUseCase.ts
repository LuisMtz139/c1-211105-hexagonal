import { User } from "../domain/entities/user";
import { UserRepository } from "../domain/repositories/userRepository";

export class FilterUserUseCase {
    constructor(readonly userRepository: UserRepository) {}
    
    async run(filter: string,  email?:string, name?:string): Promise<User| User[] |null> {
        try {
            const list = await this.userRepository.filterUser(filter,email, name);
            return list;
        } catch (error) {
            return null;
        }
    }
}

import { UserRepository } from "../domain/repositories/userRepository";
import { User } from "../domain/entities/user";

export class CerarSesionUseCase {
    constructor( readonly userRepository: UserRepository) {}

    async run(id: number): Promise<User | null> {
        try {
            const activeUser = await this.userRepository.cerrarSesion(id);
            return activeUser;
        } catch (error) {
            return null;
        }
    }
}
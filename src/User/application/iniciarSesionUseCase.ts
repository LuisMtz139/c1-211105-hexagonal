import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';

export class IniciarSesionUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async run(email: string, password: string): Promise<User | null> {
        try {
            const user = await this.userRepository.iniciarSesion(email, password);

            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            // Manejo de errores
            console.error('Error al iniciar sesión:', error);
            return null;
        }
    }
}

import { validate } from "class-validator";
import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';
import { ValidationLogin } from "../domain/validations/validationsUser";

export class IniciarSesionUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async run(email: string, password: string): Promise<User | null> {
        let valitationids = new ValidationLogin(email,password);
        const validation = await validate(valitationids)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));

        }
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

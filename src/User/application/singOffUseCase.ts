import { UserRepository } from "../domain/repositories/userRepository";
import { User } from "../domain/entities/user";
import { ValidationIdUser } from "../domain/validations/validationsUser";
import { validate } from "class-validator";

export class CerarSesionUseCase {
    constructor( readonly userRepository: UserRepository) {}

    async run(id: number): Promise<User | null> {
        let valitationid = new ValidationIdUser(id);
        const validation = await validate(valitationid)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const activeUser = await this.userRepository.cerrarSesion(id);
            return activeUser;
        } catch (error) {
            return null;
        }
    }
}
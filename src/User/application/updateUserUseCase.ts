import { validate } from "class-validator";
import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';
import { updateUserValidation } from "../domain/validations/validationsUser";

export class UpdateUserUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async updateUser(
    id: number,
    newUser?: { name?: string; password?: string; email?: string; status?: boolean}
  ): Promise<User | null> {

    let valitationUpdate = new updateUserValidation(newUser?.name, newUser?.email, newUser?.password, newUser?.status);
    const validation = await validate(valitationUpdate)
    if (validation.length > 0) {
        throw new Error(JSON.stringify(validation));
    }

    try {
      const updateUser = await this.userRepository.updateUser(id, newUser);
      return updateUser;
    } catch (error) {
      return null;
    }
  }
}

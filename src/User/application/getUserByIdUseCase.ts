import { validate } from "class-validator";
import { User } from "../domain/entities/user";
import { UserRepository } from "../domain/repositories/userRepository";
import { ValidationIdUser } from "../domain/validations/validationsUser";


export class GetUserByIdUseCase{
    constructor (readonly userRepository: UserRepository ){}

    async getUserId(id:number):Promise<User|null>{
      let valitationid = new ValidationIdUser(id);
    const validation = await validate(valitationid)
    if (validation.length > 0) {
      throw new Error(JSON.stringify(validation));
    }
        try {
            const userId = await this.userRepository.getUserById(id);
            return userId;
          } catch (error) {
            return null;
          }
    }
}
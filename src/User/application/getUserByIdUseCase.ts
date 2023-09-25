import { User } from "../domain/entities/user";
import { UserRepository } from "../domain/repositories/userRepository";


export class GetUserByIdUseCase{
    constructor (readonly userRepository: UserRepository ){}

    async getUserId(id:number):Promise<User|null>{
        try {
            const userId = await this.userRepository.getUserById(id);
            return userId;
          } catch (error) {
            return null;
          }
    }
}
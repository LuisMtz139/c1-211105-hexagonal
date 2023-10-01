//lista de todos los usuarios

import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';


export class ListAllUserUseCase{
    constructor(readonly userRepository: UserRepository ){}
    async getAllUsers(): Promise<User[]> {
        try {
          const users = await this.userRepository.listAllUsers();
          return users || [];
        } catch (error) {
            return []
        }
      }
      
}
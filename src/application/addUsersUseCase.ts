//agregar un usuario

import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';


export class AddUserUseCase{
    constructor(readonly userRepository: UserRepository ){}


    async run(
        name:String,
        password:String,
        email:String,
        status:string
    ):Promise<User |null >{
        try{
            const createUser = await this.userRepository.addUser(name, password,email,status);
            return createUser;
        }catch(error){
            return  null;
        }
    }
}









//agregar un usuario

import { validate } from "class-validator";
import { User } from "../domain/entities/user";
import { UserRepository } from '../domain/repositories/userRepository';
import { ValidationCreateUser } from "../domain/validations/validationsUser";


export class AddUserUseCase{
    constructor(readonly userRepository: UserRepository ){}


    async run(
        name:string,
        email:string,
        password:string,
        status:boolean
    ):Promise<User |null >{
        let valitationPost = new ValidationCreateUser(name,email, password, status);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try{
            const createUser = await this.userRepository.addUser(name,email, password,status);
            return createUser;
        }catch(error){
            return  null;
        }
    }
}



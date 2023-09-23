import { User } from "../entities/user";

export interface UserRepository{
    //agregar un usuario
    //se toma como parametro el nombre y devuelve una promesa
    addUser(name:String, passwordpassword:String, email:String, status:string ): Promise<User>|null;
}
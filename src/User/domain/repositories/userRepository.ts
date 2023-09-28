import { User } from "../entities/user";

export interface UserRepository{
    //agregar un usuario
    //se toma como parametro el nombre y devuelve una promesa
    addUser(name:String, passwordpassword:String, email:String, status:string ): Promise<User>|null;
    //eliminar usuario
    deleteUser(userId:string): Promise<boolean>;

    //listar todos los usuarios 
    listAllUsers(): Promise<User[]>;

    //listar por un usuario
    getUserById(id:number): Promise<User | null>

    //actualizar contraseña
    updatePassword(id: number, newPassword: string): Promise<User | null>;

    //actualizar usuairo 
    updateUser(id: number,newUser?: { name?: string; password?: string; email?: string; status?: string }): Promise<User | null>;

    //activar usuario 
    activeUser(id: number): Promise<User | null>;

    //listar todos los usuarios inactivos
    listUserInactive(): Promise<User[] | User | null>;
    
    //filtrar datos por email o name
    filterUser( filter: string, email?: string, name?: string ): Promise<User | User[] | null>
    
    //eliminar reseña(unicamente el usuario que agrego que agrego la reseña)
    eliminarReseña(userId: number, reviewId: String): Promise<boolean>;



}
    
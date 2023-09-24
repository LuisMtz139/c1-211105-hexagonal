import { AddUserUseCase } from '../../application/addUsersUseCase';
import { Request, Response } from "express";
import { DeleteUserUseCase } from '../../application/deleteUsersUseCase';
import { ListAllUserUseCase } from '../../application/listAllUsersUseCase';


export class UsersContoller{
    constructor(
         readonly addUserUseCase: AddUserUseCase,
         readonly deleteUserUseCase: DeleteUserUseCase,
         readonly listAllUserUseCase: ListAllUserUseCase,

    ) {}


    async addUser(req:Request, res:Response){
        try{
            let {name,password, email, status} = req.body;
            let createUser = await this.addUserUseCase.run(name,password,email,status);

            if (createUser) {
                return res.status(201).send({
                    status:"success",
                    data:{
                        id:createUser.id,
                        name:createUser.name,
                        password:createUser.password,
                        email:createUser.email,
                        status:createUser.status,
                    },
                    message:"El usuario se a creado con exito ha sido creado exitosamente"
                });
            }
            res.status(400).send({
                status:"error",
                data:[],
                //TODO: implementar validaciones
                validations:[],
                message:"Errosr al crear un usuario nuevo, intentalo mas tarde"
            });



        }catch(error){
            return null;
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId; // Assuming userId is in the URL params
            const userDeleted = await this.deleteUserUseCase.run(userId);

            if (userDeleted) {
                return res.status(200).json({
                    status: "success",
                    message: "Usuario eliminado"
                });
            }

            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado o no se puede eliminar"
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({
                status: "error",
                message: "Error inesperado porfavor intente de nuevo"
            });
        }
    }

    async listAllUsers(req: Request, res: Response) {
        try {
          const users = await this.listAllUserUseCase.getAllUsers();
          
          if (users && users.length > 0) {
            return res.status(200).json({
              status: 'success',
              data: users,
              message: 'Lista de usuarios obtenida exitosamente',
            });
          }
    
          return res.status(404).json({
            status: 'error',
            message: 'No se encontraron usuarios',
          });
        } catch (error) {
          console.error('Error retrieving user list:', error);
          return res.status(500).json({
            status: 'error',
            message: 'Error inesperado, por favor inténtelo de nuevo',
          });
        }
      }
    }
    

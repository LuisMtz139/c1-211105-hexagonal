import { Request, Response } from "express";
import { ListAllUserUseCase } from '../../application/listAllUsersUseCase';


export class UsersContoller{
    constructor(
         readonly listAllUserUseCase: ListAllUserUseCase,

    ) {}

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
    

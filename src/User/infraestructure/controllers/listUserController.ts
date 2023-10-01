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
          if (error instanceof Error) {

              if (error.message.startsWith('[')) {
                
                return res.status(400).send({
                  status: "error",
                  message: "Validation failed",
                  errors: JSON.parse(error.message)
                });
              }
            }
            return res.status(500).send({
              status: "error",
              message: "An error occurred while adding the book."
            });
      }
      }
    }
    

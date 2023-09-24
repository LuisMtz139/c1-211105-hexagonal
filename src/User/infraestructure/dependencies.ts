import { AddUserUseCase } from '../application/addUsersUseCase';
import { DeleteUserUseCase } from '../application/deleteUsersUseCase';
import { MysqlUserRepository } from './adapters/database/mysqlUserRepository';
import { UsersContoller } from './controllers/listUserController';
import { ListAllUserUseCase } from '../application/listAllUsersUseCase';
import { AddUserContoller } from './controllers/addUserController';
import { DeleteUserController } from './controllers/deleteUserController';
import { GetUserByIdUseCase } from '../application/getUserByIdUseCase';
import { GetUserByIdController } from './controllers/getUserByIdController';
import { UpdatePasswordUserUseCase } from '../application/updatePasswordUserUseCase';
import { UpdatePasswordUserController } from './controllers/updatePasswordUserController';


export const mysqlUserRepository = new MysqlUserRepository();


export const addUserUseCase = new AddUserUseCase(mysqlUserRepository);
export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);
export const listAllUserUseCase = new ListAllUserUseCase(mysqlUserRepository);
export const getUserByIdUseCase = new GetUserByIdUseCase(mysqlUserRepository);
export const updatePasswordUserUseCase = new UpdatePasswordUserUseCase(mysqlUserRepository);




export const usersContoller = new UsersContoller(listAllUserUseCase);

export const addUserContoller = new AddUserContoller(addUserUseCase)

export const deleteUserController = new DeleteUserController(deleteUserUseCase)

export const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

export const updatePasswordUserController = new UpdatePasswordUserController(updatePasswordUserUseCase)


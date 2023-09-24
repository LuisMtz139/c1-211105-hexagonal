import { AddUserUseCase } from '../application/addUsersUseCase';
import { DeleteUserUseCase } from '../application/deleteUsersUseCase';
import { MysqlUserRepository } from './adapters/database/mysqlUserRepository';
import { UsersContoller } from './controllers/UsersController';
import { ListAllUserUseCase } from '../application/listAllUsersUseCase';

export const mysqlUserRepository = new MysqlUserRepository();
export const addUserUseCase = new AddUserUseCase(mysqlUserRepository);
export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);
export const listAllUserUseCase = new ListAllUserUseCase(mysqlUserRepository);


export const usersContoller = new UsersContoller(addUserUseCase,
                                                 deleteUserUseCase,
                                                 listAllUserUseCase,
                                                 
                                                 
                                                 );
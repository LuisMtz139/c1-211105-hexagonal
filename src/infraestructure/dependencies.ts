import { AddUserUseCase } from '../application/addUsersUseCase';
import { MysqlUserRepository } from './adapters/database/mysqlUserRepository';
import { UsersContoller } from './controllers/UsersController';

export const mysqlUserRepository = new MysqlUserRepository();
export const addUserUseCase = new AddUserUseCase(mysqlUserRepository);
export const usersContoller = new UsersContoller(addUserUseCase);
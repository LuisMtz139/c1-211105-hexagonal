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
import { UpdateUserUseCase } from '../application/updateUserUseCase';
import { UpdateUserController } from './controllers/updateUserController';
import { ActiveUserUseCase } from '../application/activeUserUseCase';
import { ActiveUserController } from './controllers/activeUserController';
import { ListInactiveUserUseCase } from '../application/listUserInactiveUseCase';
import { ListInactiveUserController } from './controllers/listInactiveUserController';
import { FilterUserUseCase } from '../application/filterUserUseCase';
import { FilterUserController } from './controllers/filterUserController';
import { IniciarSesionUseCase } from '../application/loginUseCase';
import { IniciarSesionUserController } from './controllers/iniciarSesionUserController';
import { CerarSesionUseCase } from '../application/singOffUseCase';
import { CerrarSesionController } from './controllers/cerrarSesionController';
import { PrestarLibroUseCase } from '../application/lendBookUseCase';
import { PrestarLibroController } from './controllers/prestarLibroUserController';
import { DevolverLibroUseCase } from '../application/returnBookUseCase';
import { DevolverLibroController } from './controllers/devolverLibroController';
import { EliminarResenaUseCase } from '../application/deleteResenaUseCase';
import { EliminarResenaController } from './controllers/eliminarReseñaController';
import { EscribirResenaUseCase } from '../application/writeReseUseCase';
import { EscribirResenaController } from './controllers/escribirResenaController';
import { ActualizarResenaUseCase } from '../application/updateReseUseCase';
import { ActualizarResenaController } from './controllers/actualizarResenaController';


export const mysqlUserRepository = new MysqlUserRepository();


export const addUserUseCase = new AddUserUseCase(mysqlUserRepository);
export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);
export const listAllUserUseCase = new ListAllUserUseCase(mysqlUserRepository);
export const getUserByIdUseCase = new GetUserByIdUseCase(mysqlUserRepository);
export const updatePasswordUserUseCase = new UpdatePasswordUserUseCase(mysqlUserRepository);
export const updateUserUseCase = new UpdateUserUseCase(mysqlUserRepository);
export const ativeUserUseCase = new ActiveUserUseCase(mysqlUserRepository);
export const listInactiveUserUseCase = new ListInactiveUserUseCase(mysqlUserRepository);
export const filterUserUseCase = new FilterUserUseCase(mysqlUserRepository);
export const iniciarSesionUseCase = new IniciarSesionUseCase(mysqlUserRepository);
export const cerarSesionUseCase = new CerarSesionUseCase(mysqlUserRepository);
export const prestarLibroUseCase = new PrestarLibroUseCase(mysqlUserRepository);
export const devolverLibroUseCase = new DevolverLibroUseCase(mysqlUserRepository);
export const eliminarResenaUseCase = new EliminarResenaUseCase(mysqlUserRepository);
export const escribirResenaUseCase = new EscribirResenaUseCase(mysqlUserRepository);
export const actualizarResenaUseCase = new ActualizarResenaUseCase(mysqlUserRepository);




export const usersContoller = new UsersContoller(listAllUserUseCase);
export const addUserContoller = new AddUserContoller(addUserUseCase)
export const deleteUserController = new DeleteUserController(deleteUserUseCase)
export const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
export const updatePasswordUserController = new UpdatePasswordUserController(updatePasswordUserUseCase)
export const updateUserController = new UpdateUserController(updateUserUseCase)
export const activeUserController = new ActiveUserController(ativeUserUseCase)
export const listInactiveUserController = new ListInactiveUserController(listInactiveUserUseCase)
export const filterUserController = new FilterUserController(filterUserUseCase)
export const iniciarSesionUserController = new IniciarSesionUserController(iniciarSesionUseCase)
export const cerrarSesionController = new CerrarSesionController(cerarSesionUseCase)
export const prestarLibroController = new PrestarLibroController(prestarLibroUseCase)
export const devolverLibroController = new DevolverLibroController(devolverLibroUseCase)
export const eliminarResenaController = new EliminarResenaController(eliminarResenaUseCase)
export const escribirResenaController = new EscribirResenaController(escribirResenaUseCase)
export const actualizarResenaController = new ActualizarResenaController(actualizarResenaUseCase)






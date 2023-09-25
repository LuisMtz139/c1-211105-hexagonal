import * as express from 'express';
import { activeUserController, addUserContoller, deleteUserController, filterUserController, getUserByIdController, listInactiveUserController, updatePasswordUserController, updateUserController, usersContoller } from '../dependencies';
import { AddUserContoller } from '../controllers/addUserController';

export const userRouter = express.Router();

//agregar un usuario 
userRouter.post(
    //ejemplo de funcionamiento
    //user+direccion
    "/addUser/",
    addUserContoller.addUser.bind(addUserContoller)
)
//eliminar
userRouter.delete(
    //eliminar
    "/deleteUser/:userId",
    deleteUserController.deleteUser.bind(deleteUserController)
)
//obtener usuarios
userRouter.get(
    //listar todo
    "/listUser",
    usersContoller.listAllUsers.bind(usersContoller)
)
//obtner todos los usuarios por el id
userRouter.get(
    "/getUser/:id",
     getUserByIdController.getUserId.bind(getUserByIdController)
)
//actualizar contraseña
userRouter.post(
    '/updatePassword/',
    updatePasswordUserController.updatePassword.bind(updatePasswordUserController)
)
//actualizar datos del usuario
userRouter.post(
    '/updateUser/',
    updateUserController.updateUser.bind(updateUserController)
)
//activar usuario
userRouter.post(
    '/activate',
    activeUserController.run.bind(activeUserController)
)

//obtener todos los usuarios con status inactivo
userRouter.get(
    '/inactive',
    listInactiveUserController.run.bind(listInactiveUserController)    
)
//filtrar datos del usuario por name o email
userRouter.get(
    '/filter',
    filterUserController.run.bind(filterUserController)
  );
  










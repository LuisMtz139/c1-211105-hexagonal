import * as express from 'express';
import { addUserContoller, deleteUserController, getUserByIdController, usersContoller } from '../dependencies';
import { AddUserContoller } from '../controllers/addUserController';

export const userRouter = express.Router();

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
userRouter.get(
    "/getUser/:id",
     getUserByIdController.getUserId.bind(getUserByIdController)
)




import * as express from 'express';
import { addUserContoller, deleteUserController, usersContoller } from '../dependencies';
import { AddUserContoller } from '../controllers/addUserController';

export const userRouter = express.Router();

userRouter.post(
    //ejemplo de funcionamiento
    //user+direccion
    "/addUser/",
    addUserContoller.addUser.bind(addUserContoller)
)

userRouter.delete(
    //eliminar
    "/deleteUser/:userId",
    deleteUserController.deleteUser.bind(deleteUserController)
)

userRouter.get(
    //listar todo
    "/listUser",
    usersContoller.listAllUsers.bind(usersContoller)
)
import * as express from 'express';
import { usersContoller } from '../dependencies';

export const userRouter = express.Router();

userRouter.post(
    //ejemplo de funcionamiento
    //user+direccion
    "/addUser/",
    usersContoller.addUser.bind(usersContoller)
)

userRouter.delete(
    //eliminar
    "/deleteUser/:userId",
    usersContoller.deleteUser.bind(usersContoller)
)

userRouter.get(
    //listar todo
    "/listUser",
    usersContoller.listAllUsers.bind(usersContoller)
)
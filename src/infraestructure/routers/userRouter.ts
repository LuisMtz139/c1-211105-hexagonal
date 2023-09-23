import * as express from 'express';
import { usersContoller } from '../dependencies';

export const userRouter = express.Router();

userRouter.post(
    "/",
    usersContoller.run.bind(usersContoller)
)

import * as express from 'express';
import { createLongController } from '../dependencies';

export const loanRouter = express.Router();


loanRouter.post(
    "/createLoan",
     createLongController.createLong.bind(createLongController)
);
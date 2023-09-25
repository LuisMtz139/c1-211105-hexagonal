import * as express from 'express';
import { createBookController } from '../dependencies';

export const bookRouter = express.Router();

bookRouter.post(
    "/addBook", createBookController.create.bind(createBookController)
);
import * as express from 'express';
import { createBookController, getAllBookController } from '../dependencies';

export const bookRouter = express.Router();

bookRouter.post(
    "/addBook", 
    createBookController.create.bind(createBookController)
);

bookRouter.get(
    "/getAllBook", 
    getAllBookController.getAllBook.bind(getAllBookController)
)
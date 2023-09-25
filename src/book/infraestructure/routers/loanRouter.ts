import * as express from 'express';
import { createBookController, getAllBookController, getBookByIdController, updateStatusController } from '../dependencies';

export const bookRouter = express.Router();

bookRouter.post(
    "/addBook", 
    createBookController.create.bind(createBookController)
);

bookRouter.get(
    "/getAllBook", 
    getAllBookController.getAllBook.bind(getAllBookController)
)

bookRouter.get(
    "/getBookById/:id", 
    getBookByIdController.getBook.bind(getBookByIdController)
)

bookRouter.put(
    "/actualizar", 
    updateStatusController.updateStatus.bind(updateStatusController)
)
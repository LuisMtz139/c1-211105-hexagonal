import * as express from 'express';
import { createBookController, deleteBookController, getAllBookController, getBookByIdController, getBookInactiveController, updateBookController,  updateStatusController } from '../dependencies';

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

bookRouter.get(
    "/getBookInactivate",
     getBookInactiveController.getBookInactive.bind(getBookInactiveController)
)
bookRouter.put(
    "/updateBook", 
    updateBookController.updateBook.bind(updateBookController)
)

bookRouter.delete(
    "/EliminarBook/:id",
     deleteBookController.deleteBook.bind(deleteBookController)
)

bookRouter.patch(
    "/actualizarBook/:id",
     updateBookController.updateBook.bind(updateBookController)
)
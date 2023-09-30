import * as express from 'express';
import { createBookController, deleteBookController, getBookByIdController, getBookFilterController, getBookInactiveController, getBookReviewsController, getBooksController, updateBookController, updateBookLeadController, updateBookStoreController, updateStatusController } from '../dependencies';

export const bookRouter = express.Router();


//agregar un libro
bookRouter.post(
    "/", 
    createBookController.create.bind(createBookController)
);

//eliminar Libro
bookRouter.delete(
    "/deleteBook/:id",
     deleteBookController.deleteBook.bind(deleteBookController)
)

//get book by id
bookRouter.get(
    "/getBookById/:id",
     getBookByIdController.getBookById.bind(getBookByIdController)
)
//obetner todo 
bookRouter.get(
    "/getAll", 

    getBooksController.getAll.bind(getBooksController)
)
bookRouter.get(
    "/getFilter/",
     getBookFilterController.bookFilter.bind(getBookFilterController)
)
bookRouter.get(
    "/getInactivate",
     getBookInactiveController.getBookInactive.bind(getBookInactiveController)
)

bookRouter.get(
    "/review",
     getBookReviewsController.getAll.bind(getBookReviewsController)
)

bookRouter.put(
    "/putBook/:id", 
    updateBookController.update.bind(updateBookController)
)
//actualizar estadop lead
bookRouter.put(
    "/putLeaded/:id",
     updateBookLeadController.updateBookLead.bind(updateBookLeadController)
)
bookRouter.put(
    "/store/:id",
     updateBookStoreController.updateBookStore.bind(updateBookStoreController)
)

bookRouter.put(
    "/updateStatus/:id", 
    updateStatusController.updateStatus.bind(updateStatusController)
)









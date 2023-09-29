import * as express from 'express';
import { agregarBookController, getInactiveBookController, obtenerBookByIdController, obtenerBookController, prestarBookController, updateStatusController } from '../dependencies';

export const bookRouter = express.Router();


//agregar un libro
bookRouter.post(
    "/", 
    agregarBookController.agregarBook.bind(agregarBookController)
);


//Obtener todos los book
bookRouter.get(
    "/getBooks", 
    obtenerBookController.obetenreBook.bind(obtenerBookController)
)
//obtener BookById
bookRouter.get(
    "/getBookById/:id",
    obtenerBookByIdController.obtenerBookByIdBookController.bind(obtenerBookByIdController)
)

//updateStatus
bookRouter.put(
    "/updateStatus/:id", 
    updateStatusController.updateStatus.bind(updateStatusController)
)

//obetener la lista de los book inactives
bookRouter.get(
    "/getBookInactive", 
    getInactiveBookController.getBookInactive.bind(getInactiveBookController)
)

//realizar un prestamo del libro 
bookRouter.put(
    "/preestarBookLean/:id", 
    prestarBookController.prestarBook.bind(prestarBookController)
)

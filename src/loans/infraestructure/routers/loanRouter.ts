import * as express from 'express';
import { createLongController, deleteLoanController, getAllLoanController } from '../dependencies';

export const loanRouter = express.Router();


loanRouter.post(
    "/createLoan",
     createLongController.createLong.bind(createLongController)
);

loanRouter.delete(
    //eliminar
    "/deleteLoan/:loanId",
    deleteLoanController.deleteLoan.bind(deleteLoanController)
)

//obtener todos los reseñas
loanRouter.get(
    //listar todo
    "/listLoan",
    getAllLoanController.getAllLoan.bind(getAllLoanController)
)
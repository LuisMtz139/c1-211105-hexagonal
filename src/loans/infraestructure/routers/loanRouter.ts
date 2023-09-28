import * as express from 'express';
import { createLongController, deleteLoanController, getAllLoanController, getLoanByIdController, updateLoanController } from '../dependencies';
import { UpdateLoanController } from '../controllers/UpdateLoancontroller';

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

//Obtener un usuario por un id 
loanRouter.get(
    "/getLoan/:id",
     getLoanByIdController.getLoanById.bind(getLoanByIdController)
)

//actulzair Loan
loanRouter.post(
    '/updateLoan',
    updateLoanController.updateLoan.bind(updateLoanController)
)
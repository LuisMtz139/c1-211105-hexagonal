import { CreateLonUseCase } from '../application/createLoanUseCase';
import { DeleteLoanUseCase } from '../application/deleteLoanUseCase';
import { GetAllLoanUseCase } from '../application/getAllLoanUseCase';
import { GetLoanByIdUseCase } from '../application/getLoanByIdUseCase';
import { UpdateLoanUseCase } from '../application/updateLoanUseCase';
import { MysqlLoanRepository } from './adapters/database/mysqlLoanRepository';
import { UpdateLoanController } from './controllers/UpdateLoancontroller';
import { CreateLongController } from './controllers/createLoanController';
import { DeleteLoanController } from './controllers/deleteLoanController';
import { GetAllLoanController } from './controllers/getAllLoanController';
import { GetLoanByIdController } from './controllers/getLoanByIdController';




export const mysqlLoanRepository = new MysqlLoanRepository();






export const createLonUseCase = new CreateLonUseCase(mysqlLoanRepository);
export const deleteLoanUseCase = new DeleteLoanUseCase(mysqlLoanRepository);
export const getAllLoanUseCase = new GetAllLoanUseCase(mysqlLoanRepository);
export const getLoanByIdUseCase = new GetLoanByIdUseCase(mysqlLoanRepository);
export const updateLoanUseCase = new UpdateLoanUseCase(mysqlLoanRepository);





export const createLongController = new CreateLongController(createLonUseCase);
export const deleteLoanController = new DeleteLoanController(deleteLoanUseCase);
export const getAllLoanController = new GetAllLoanController(getAllLoanUseCase);
export const getLoanByIdController = new GetLoanByIdController(getLoanByIdUseCase);
export const updateLoanController = new UpdateLoanController(updateLoanUseCase);

import { CreateLonUseCase } from '../application/createLoanUseCase';
import { DeleteLoanUseCase } from '../application/deleteLoanUseCase';
import { GetAllLoanUseCase } from '../application/getAllLoanUseCase';
import { MysqlLoanRepository } from './adapters/database/mysqlLoanRepository';
import { CreateLongController } from './controllers/createLoanController';
import { DeleteLoanController } from './controllers/deleteLoanController';
import { GetAllLoanController } from './controllers/getAllLoanController';




export const mysqlLoanRepository = new MysqlLoanRepository();






export const createLonUseCase = new CreateLonUseCase(mysqlLoanRepository);
export const deleteLoanUseCase = new DeleteLoanUseCase(mysqlLoanRepository);
export const getAllLoanUseCase = new GetAllLoanUseCase(mysqlLoanRepository);





export const createLongController = new CreateLongController(createLonUseCase);
export const deleteLoanController = new DeleteLoanController(deleteLoanUseCase);
export const getAllLoanController = new GetAllLoanController(getAllLoanUseCase);

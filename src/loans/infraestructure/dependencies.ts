import { CreateLonUseCase } from '../application/createLoanUseCase';
import { MysqlLoanRepository } from './adapters/database/mysqlLoanRepository';
import { CreateLongController } from './controllers/createLoanController';




export const mysqlLoanRepository = new MysqlLoanRepository();






export const createLonUseCase = new CreateLonUseCase(mysqlLoanRepository);





export const createLongController = new CreateLongController(createLonUseCase);

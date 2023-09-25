import { CreateBookUserCase } from "../application/createBookUseCase";
import { MysqlBookRepository } from "./adapters/mysqlBookRepository";
import { CreateBookController } from "./controllers/createBookController";


export const mysqlBookRepository = new MysqlBookRepository();









export const createBookUserCase = new CreateBookUserCase(mysqlBookRepository);






export const createBookController = new CreateBookController(createBookUserCase);






import { CreateBookUserCase } from "../application/createBookUseCase";
import { GetAllBookUseCase } from "../application/getAllBookUseCase";
import { MysqlBookRepository } from "./adapters/mysqlBookRepository";
import { CreateBookController } from "./controllers/createBookController";
import { GetAllBookController } from "./controllers/getAllBookController";


export const mysqlBookRepository = new MysqlBookRepository();









export const createBookUserCase = new CreateBookUserCase(mysqlBookRepository);
export const getAllBookUseCase = new GetAllBookUseCase(mysqlBookRepository);






export const createBookController = new CreateBookController(createBookUserCase);
export const getAllBookController = new GetAllBookController(getAllBookUseCase);






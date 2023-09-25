import { CreateBookUserCase } from "../application/createBookUseCase";
import { GetAllBookUseCase } from "../application/getAllBookUseCase";
import { GetBookByIdUseCase } from "../application/getBookByIdUseCase";
import { MysqlBookRepository } from "./adapters/mysqlBookRepository";
import { CreateBookController } from "./controllers/createBookController";
import { GetAllBookController } from "./controllers/getAllBookController";
import { GetBookByIdController } from "./controllers/getBookByIdController";


export const mysqlBookRepository = new MysqlBookRepository();









export const createBookUserCase = new CreateBookUserCase(mysqlBookRepository);
export const getAllBookUseCase = new GetAllBookUseCase(mysqlBookRepository);
export const getBookByIdUseCase = new GetBookByIdUseCase(mysqlBookRepository);






export const createBookController = new CreateBookController(createBookUserCase);
export const getAllBookController = new GetAllBookController(getAllBookUseCase);
export const getBookByIdController = new GetBookByIdController(getBookByIdUseCase);






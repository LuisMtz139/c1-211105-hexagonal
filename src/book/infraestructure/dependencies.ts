import { CreateBookUserCase } from "../application/createBookUseCase";
import { GetBookAllInactiveUseCase } from "../application/getAllBookInactiveUseCase";
import { GetAllBookUseCase } from "../application/getAllBookUseCase";
import { GetBookByIdUseCase } from "../application/getBookByIdUseCase";
import { UpdateBookUseCase } from "../application/updateBookUseCase";
import { UpdateStatusUseCase } from "../application/updateStatusBookUseCase";
import { MysqlBookRepository } from "./adapters/mysqlBookRepository";
import { CreateBookController } from "./controllers/createBookController";
import { GetAllBookController } from "./controllers/getAllBookController";
import { GetBookInactiveController } from "./controllers/getAllBookInactiveController";
import { GetBookByIdController } from "./controllers/getBookByIdController";
import { UpdateBookController } from "./controllers/updateBookController";
import { UpdateStatusController } from "./controllers/updateBookStatusController";


export const mysqlBookRepository = new MysqlBookRepository();









export const createBookUserCase = new CreateBookUserCase(mysqlBookRepository);
export const getAllBookUseCase = new GetAllBookUseCase(mysqlBookRepository);
export const getBookByIdUseCase = new GetBookByIdUseCase(mysqlBookRepository);
export const updateStatusUseCase = new UpdateStatusUseCase(mysqlBookRepository);
export const getBookAllInactiveUseCase = new GetBookAllInactiveUseCase(mysqlBookRepository);
export const updateBookUseCase = new UpdateBookUseCase(mysqlBookRepository);






export const createBookController = new CreateBookController(createBookUserCase);
export const getAllBookController = new GetAllBookController(getAllBookUseCase);
export const getBookByIdController = new GetBookByIdController(getBookByIdUseCase);
export const updateStatusController = new UpdateStatusController(updateStatusUseCase);
export const getBookInactiveController = new GetBookInactiveController(getBookAllInactiveUseCase);
export const updateBookController = new UpdateBookController(updateBookUseCase);






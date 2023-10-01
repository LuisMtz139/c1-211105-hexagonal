import { CreateBookUserCase } from "../application/createBookUseCase";
import { DeleteBookUseCase } from "../application/deleteBookUseCase";
import { GetBookByIdUseCasa } from "../application/getBookByIdUseCase";
import { GetBookInactiveUseCase } from "../application/getBookInactiveUseCase";
import { GetBooksUseCase } from "../application/getBookUseCase";
import { UpdateBookLeadUseCase } from "../application/updateBookLoadedUseCase";
import { UpdateBookStoreUseCase } from "../application/updateBookStoreUseCase";
import { UpdateStatusUseCase } from "../application/updateStatusUseCase";
import { MysqlBookRepository } from "./adapters/mysqlBookRepository";
import { CreateBookController } from "./controllers/createBookController";
import { DeleteBookController } from "./controllers/deleteBookController";
import { GetBookByIdController } from "./controllers/getBookByIdController";
import { GetBooksController } from "./controllers/getBookController";
import { GetBookFilterController } from "./controllers/getBookFilterController";
import { GetBookInactiveController } from "./controllers/getBookInactiveController";
import { UpdateBookLeadController } from "./controllers/updateBookLoadedController";
import { UpdateBookStoreController } from "./controllers/updateBookStoreController";
import { UpdateStatusController } from "./controllers/updateStatusController";
import { GetBookReviewsController } from './controllers/getBookReviewController';
import { UpdateBookController } from "./controllers/updateBookController";
import { GetBookFilterUseCase } from "../application/getBookFilterUseCase";
import { GetBookReviewUseCase } from "../application/getBookReviewUseCase";
import { UpdateBookUseCase } from "../application/updateBookUseCase";



export const mysqlBookRepository = new MysqlBookRepository();









export const createBookUserCase = new CreateBookUserCase(mysqlBookRepository);
export const deleteBookUseCase = new DeleteBookUseCase(mysqlBookRepository);
export const getBookByIdUseCasa = new GetBookByIdUseCasa(mysqlBookRepository);
export const getBooksUseCase = new GetBooksUseCase(mysqlBookRepository);
export const getBookFilterUseCase = new GetBookFilterUseCase(mysqlBookRepository);
export const getBookInactiveUseCase = new GetBookInactiveUseCase(mysqlBookRepository);
export const getBookReviewUseCase = new GetBookReviewUseCase(mysqlBookRepository);
export const updateBookUseCase = new UpdateBookUseCase(mysqlBookRepository);
export const updateBookLeadUseCase = new UpdateBookLeadUseCase(mysqlBookRepository);
export const updateBookStoreUseCase = new UpdateBookStoreUseCase(mysqlBookRepository);
export const updateStatusUseCase = new UpdateStatusUseCase(mysqlBookRepository);






export const createBookController = new CreateBookController(createBookUserCase);
export const deleteBookController = new DeleteBookController(deleteBookUseCase);
export const getBookByIdController = new GetBookByIdController(getBookByIdUseCasa);
export const getBooksController = new GetBooksController(getBooksUseCase);
export const getBookFilterController = new GetBookFilterController(getBookFilterUseCase);
export const getBookInactiveController = new GetBookInactiveController(getBookInactiveUseCase);
export const getBookReviewsController = new GetBookReviewsController(getBookReviewUseCase);
export const updateBookController = new UpdateBookController(updateBookUseCase);
export const updateBookLeadController = new UpdateBookLeadController(updateBookLeadUseCase);
export const updateBookStoreController = new UpdateBookStoreController(updateBookStoreUseCase);
export const updateStatusController = new UpdateStatusController(updateStatusUseCase);





import { AgregarBookUseCase } from "../application/agregarBookUseCase";
import { GetBookInactiveUseCase } from "../application/getInactiveBookUseCase";
import { ObtenerBookByIdUseCase } from "../application/obtenerBookByIdUseCase";
import { ObtenerBookUseCase } from "../application/obtenerBookUseCase";
import { PrestarBookUseCase } from "../application/prestarBookUseCase";
import { UpdateStatusUseCase } from "../application/updateStatusBookUseCase";
import { MysqlBookRepository } from "./adapters/mysqlBookRepository";
import { ObtenerBookController } from "./controllers/ObtenerBookController";
import { AgregarBookController } from "./controllers/agregarBookController";
import { GetInactiveBookController } from "./controllers/getInactiveBookController";
import { ObtenerBookByIdController } from "./controllers/obtenerBookByIdController";
import { PrestarBookController } from "./controllers/prestarBookController";
import { UpdateStatusController } from "./controllers/updateStatusBookController";



export const mysqlBookRepository = new MysqlBookRepository();









export const agregarBookUseCase = new AgregarBookUseCase(mysqlBookRepository);
export const obtenerBookUseCase = new ObtenerBookUseCase(mysqlBookRepository);
export const obtenerBookByIdUseCase = new ObtenerBookByIdUseCase(mysqlBookRepository);
export const updateStatusUseCase = new UpdateStatusUseCase(mysqlBookRepository);
export const getBookInactiveUseCase = new GetBookInactiveUseCase(mysqlBookRepository);
export const prestarBookUseCase = new PrestarBookUseCase(mysqlBookRepository);







export const agregarBookController = new AgregarBookController(agregarBookUseCase);
export const obtenerBookController = new ObtenerBookController(obtenerBookUseCase);
export const obtenerBookByIdController = new ObtenerBookByIdController(obtenerBookByIdUseCase);
export const updateStatusController = new UpdateStatusController(updateStatusUseCase);
export const getInactiveBookController = new GetInactiveBookController(getBookInactiveUseCase);
export const prestarBookController = new PrestarBookController(prestarBookUseCase);






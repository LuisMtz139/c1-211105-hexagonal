import { CreateReviewUseCase } from "../application/createReviewUseCase";
import { GetAllReviewUseCase } from "../application/getAllReviewUseCase";
import { GetReviewByIdUseCase } from "../application/getReviewByIdUseCase";
import { GetReviewByIdUserUseCase } from "../application/getReviewByIdUserUseCase";
import { MysqlReviewRepository } from "./adapters/mysqlReviewRepository";
import { CreateReviewController } from "./controllers/createReviewController";
import { GetAllReviewsController } from "./controllers/getAllReviewController";
import { GetReviewByIdController } from "./controllers/getReviewByIdController";
import { GetReviewByUserController } from "./controllers/getReviewByUserController";


export const mysqlReviewRepository = new MysqlReviewRepository();



export const getAllReviewUseCase = new GetAllReviewUseCase(mysqlReviewRepository);
export const getReviewByIdUseCase = new GetReviewByIdUseCase(mysqlReviewRepository);
export const getReviewByIdUserUseCase = new GetReviewByIdUserUseCase(mysqlReviewRepository);
export const createReviewUseCase = new CreateReviewUseCase(mysqlReviewRepository);



export const getAllReviewsController = new GetAllReviewsController(getAllReviewUseCase);
export const getReviewByIdController = new GetReviewByIdController(getReviewByIdUseCase);
export const getReviewByUserController = new GetReviewByUserController(getReviewByIdUserUseCase);
export const createReviewController = new CreateReviewController(createReviewUseCase);

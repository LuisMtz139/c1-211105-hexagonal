import express  from "express";
import { createReviewController, getAllReviewsController, getReviewByIdController, getReviewByUserController } from "../dependenses";

export const reviewRoutes = express.Router();

//Obtener todos las view
reviewRoutes.get(
    "/getAll", 
    getAllReviewsController.listAllReviews.bind(getAllReviewsController)
)
//Obtener solo un view
reviewRoutes.get(
    "/view/:id", 
    getReviewByIdController.getReviewById.bind(getReviewByIdController)
)
//filtrar resena por usuario 
reviewRoutes.get(
    "/filterReview/:id_User", 
    getReviewByUserController.getReviewUser.bind(getReviewByUserController)
)
//Crear Revies
reviewRoutes.post(
    "/",
     createReviewController.createReviewController.bind(createReviewController)
)
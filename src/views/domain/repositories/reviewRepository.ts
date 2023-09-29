import { Review } from "../entities/review";


export interface ReviewRepository{
    //agregar erview
    createReview(id_user:number,id_book:number,review_texr:string,status: boolean): Promise <Review | null>
    //obtener todo 
    getAllReview():Promise<Review[] | null>;
    //obtener solo un review
    getReviewById(id:number):Promise< Review| Review[]| null>;
    //obtener review por usuario \
    getReviewByUser(id_User:number):Promise<Review[]| null>

}
import { query } from "../../../database/mysql";
import { Review } from "../../domain/entities/review";
import { ReviewRepository } from "../../domain/repositories/reviewRepository";


export class MysqlReviewRepository implements ReviewRepository {

    async getAllReview():Promise<Review[]|null>{
        const sql ="SELECT * FROM REVIEW"
        try {
            const [result]:any = await query(sql,[]);
            const dataReviews = Object.values(JSON.parse(JSON.stringify(result)));
            
            return (dataReviews).map((review:any) =>
                new Review(
                    review.id,
                    review.id_User,
                    review.id_Book,
                    review.review_text,
                    review.status
                )
            )
        } catch (error) {
            console.error("Error al obtener la lista de reseñas:", error);
            return null;
        }
    }
    
    async getReviewById(id_User:number):Promise<Review | null>{
        try {
            const sql = "SELECT * FROM review WHERE id = ?";
            const params :any[] = [id_User];
            const [result]: any = await query(sql,params)

            if (result && result.length > 0) {
                const dataReview = result[0];
                return new Review(
                  dataReview.id,
                  dataReview.id_User,
                  dataReview.id_Book,
                  dataReview.review_text,
                  dataReview.status
                );
              } else {
                return null; // No se encontró un libro con el ID especificado
              }
        } catch (error) {
            console.error("Eror al tener review", error);
            return null
        }
    }

    async getReviewByUser(id_User: number): Promise<Review[] | null> {
        try {
          const sql = "SELECT * FROM REVIEW WHERE id_User = ?";
          const params: any[] = [id_User];
      
          const [result]: any = await query(sql, params);
      
          if (result && result.length > 0) {
            // Mapea los resultados en objetos Review
            const reviews = result.map((dataReview: any) => new Review(
              dataReview.id,
              dataReview.id_User,
              dataReview.id_Book,
              dataReview.review_text,
              dataReview.status
            ));
      
            return reviews;
          } else {
            return [];
          }
        } catch (error) {
          console.error("Error al obtener la lista de reseñas del usuario:", error);
          return null;
        }
    }

 // Definición de la función para crear una reseña
async  createReview(id_user: number, id_book: number, review_text: string, status: boolean): Promise<Review | null> {
    try {
      // Validación de existencia de id_user y id_book antes de la inserción
      const userCheckSql = 'SELECT 1 FROM Users WHERE id = ?;';
      const bookCheckSql = 'SELECT 1 FROM Books WHERE id = ?;';
  
      const [userResult]: any = await query(userCheckSql, [id_user]);
      const [bookResult]: any = await query(bookCheckSql, [id_book]);
  
      if (!userResult?.length || !bookResult?.length) {
        throw new Error('El usuario o el libro especificado no existe.');
      }
  
      // Si tanto el usuario como el libro existen, proceder con la inserción de la reseña
      const insertSql = 'INSERT INTO Review (id_User, id_Book, review_text, status) VALUES (?, ?, ?, ?);';
  
      // Verificar y reemplazar valores undefined con null
      const params: any[] = [id_user || null, id_book || null, review_text || null, status === undefined ? null : status];
  
      const [result]: any = await query(insertSql, params);
  
      if (!result || !result.insertId) {
        throw new Error('No se pudo obtener el ID de la reseña insertada.');
      }
  
      const reviewId = result.insertId;
      const review = new Review(reviewId, id_user, id_book, review_text, status);
  
      return review;
    } catch (error) {
      console.error('Error al agregar una reseña:', error);
      throw new Error('Error al agregar una reseña.');
    }
  }
  


}

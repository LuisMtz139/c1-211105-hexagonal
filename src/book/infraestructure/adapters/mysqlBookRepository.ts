//import { query } from '../../database/postgresql';

import { query } from '../../../database/mysql';
import { Book } from '../../domain/entities/book';
import { BookRepository } from '../../domain/repositories/bookRepository';



export class MysqlBookRepository implements BookRepository{
       
    async createBook(
        title: string, 
        author: string, 
        img_url: string, 
        status: string, 
        is_loaded: boolean
        ): Promise<Book|null> {
       try {
           const sql = "INSERT INTO BOOKS (title,author,img_url,status,is_loaded) VALUES(?,?,?,?,?)";
           const params: any[] = [title,author,img_url,status,is_loaded];
           const [result]:any = await query(sql,params);
           return new Book(result.id,title,author,img_url,status,is_loaded);
       } catch (error) {
           return null;
       }
   }
   async getAll():Promise<Book[]|null>{
       const sql = "SELECT * FROM BOOKS";
       try {
           
           const [result]: any = await query(sql,[]);
           const  dataBooks = Object.values(JSON.parse(JSON.stringify(result)))

           return (dataBooks).map((book:any)=>
               new Book(
                   book.id,
                   book.title,
                   book.author,
                   book.img_url,
                   book.status,
                   book.is_loaded                
               )
           );
         } catch (error) {
           console.error("Error al obtener la lista de libros:", error);
           return null;
         }
   }

  async getAllBook(): Promise<Book[] | null> {
    const sql = "SELECT * FROM BOOKS";
    try {
        
        const [result]: any = await query(sql,[]);
        const  dataBooks = Object.values(JSON.parse(JSON.stringify(result)))

        return (dataBooks).map((book:any)=>
            new Book(
                book.id,
                book.title,
                book.author,
                book.img_url,
                book.status,
                book.is_loaded                
            )
        );
      } catch (error) {
        console.error("Error al obtener la lista de libros:", error);
        return null;
      }    
    }


    async getBookById(id: number): Promise<Book | null> {
        try {
          const sql = "SELECT * FROM BOOKS WHERE id = ?";
          const params: any[] = [id];
          const [result]: any = await query(sql, params);
      
          if (result && result.length > 0) {
            const bookData = result[0];
            return new Book(
              bookData.id,
              bookData.title,
              bookData.author,
              bookData.img_url,
              bookData.status,
              bookData.is_loaded
            );
          } else {
            return null; // No se encontró un libro con el ID especificado
          }
        } catch (error) {
          console.error("Error al traer libro:", error);
          return null;
        }
     
    }

   async updataStatus(id: number, newStatus: string): Promise<Book | null> {
    try {
        const sql = "UPDATE BOOKS SET status = ? WHERE id = ?";
        const params: any[] = [newStatus, id];
        
        // Ejecuta la consulta de actualización en la base de datos
        const [result]: any = await query(sql, params);
    
        if (result && result.affectedRows > 0) {
          // Si al menos una fila fue afectada por la actualización, significa que se actualizó con éxito
          // Obtén el libro actualizado de la base de datos
          const updatedBook = await this.getBookById(id);
          return updatedBook;
        } else {
          return null; // No se encontró un libro con el ID especificado o no se actualizó ningún registro
        }
      } catch (error) {
        console.error("Error al actualizar el estado del libro:", error);
        return null; // Puedes manejar el error de alguna manera adecuada
      }    
    }

    async getAllBookInactive(status: string): Promise<Book[] | null> {
        try {
          const sql = "SELECT * FROM BOOKS WHERE status = ?";
          const params: any[] = [status];
      
          const [result]: any = await query(sql, params);
      
          if (result && result.length > 0) {
            const inactiveBooks = result.map((bookData: any) => new Book(
              bookData.id,
              bookData.title,
              bookData.author,
              bookData.img_url,
              bookData.status,
              bookData.is_loaded
            ));
      
            return inactiveBooks;
          } else {
            return [];
          }
        } catch (error) {
          console.error("No se pudo obtener los usuarios inactivos:", error);
          return null;
        }
    }
}
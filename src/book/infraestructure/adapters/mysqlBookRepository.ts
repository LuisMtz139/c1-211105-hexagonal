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
      }    }
}
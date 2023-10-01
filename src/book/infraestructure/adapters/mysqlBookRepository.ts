//import { query } from '../../database/postgresql';

import { query } from '../../../database/mysql';
import { Book } from '../../domain/entities/book';
import { BookRepository } from '../../domain/repositories/bookRepository';



export class MysqlBookRepository implements BookRepository{

  async createBook(title: string, author: string, img_url: string, status: boolean, is_loaded: boolean): Promise<Book|null> {
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
            new Book(book.id,book.title,book.author,book.img_url,book.status,book.is_loaded)
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
        return new Book(bookData.id,bookData.title,bookData.author,bookData.img_url,bookData.status, bookData.is_loaded);
      } else {
        return null; // No se encontró un libro con el ID especificado
      }
    } catch (error) {
      console.error("Error al obtener el libro por ID:", error);
      return null;
    }
}

async updataStatus(id: number): Promise<Book | null> {
    try {
      const existingBook = await this.getBookById(id)
      if (!existingBook) {
        return null; // No se encontró una revisión con el ID especificado
      }
      const updateBookInactive = new Book(existingBook.id,existingBook.title,existingBook.author, existingBook.img_url,false,existingBook.is_loaded);

      const sql = "UPDATE BOOKS SET status = ? WHERE id = ?";
      const params:any[] = [updateBookInactive.status,updateBookInactive.id];
      await query(sql,params);

      return updateBookInactive;
      
    } catch (error) {
      console.error("Error al actualizar el estado del libro:", error);
      return null; 
    }
}

async getBookInactive(status: boolean): Promise<Book[] | null> {
    try {
      const sql = "SELECT * FROM BOOKS WHERE status = ?";
      const params: any[] = [status];
  
      const [result]: any = await query(sql, params);
  
      if (result && result.length > 0) {
        // Mapea los resultados en objetos Book
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
      console.error("Error al obtener la lista de libros inactivos:", error);
      return null;
    }
}

async updateBookLoaded(id: number): Promise<Book | null> {
    try {
      const existingBook = await this.getBookById(id);
      if (!existingBook) {
        return null; // No se encontró una revisión con el ID especificado
      }
      const updateBookLoad = new Book(existingBook.id,existingBook.title,existingBook.author,existingBook.img_url,existingBook.status,true);
      const sql = "UPDATE BOOKS SET is_loaded = ? WHERE id = ?";
      const params:any[] = [updateBookLoad.is_loaded,updateBookLoad.id];
      await query(sql,params);

      return updateBookLoad;
    } catch (error) {
      console.error("Error al actualizar el campo 'is_loaded' del libro:", error);
      return null; 
    }
}

async updateBookStore(id: number): Promise<Book | null> {
    try {
      const existingBook = await this.getBookById(id);
      if (!existingBook) {
        return null; // No se encontró una revisión con el ID especificado
      }
      const updateBookStore = new Book(existingBook.id,existingBook.title,existingBook.author,existingBook.img_url,existingBook.status,false);
      const sql = "UPDATE BOOKS SET is_loaded = ? WHERE id = ?";
      const params:any[] = [updateBookStore.is_loaded,updateBookStore.id];
      await query(sql,params);

      return updateBookStore;
    } catch (error) {
      console.error("Error al actualizar el campo 'is_loaded' del libro:", error);
      return null; 
    }
}

async deleteBook(id: number): Promise<Book | null> {
    try {
      const sql = `
        DELETE books, review
        FROM books
        LEFT JOIN review ON books.id = review.id_Book
        WHERE books.id = ?;
      `;
      const params: any[] = [id];
      const [result]: any = await query(sql, params);
  
      if (result && result.affectedRows > 0) {
        // El libro y las reseñas asociadas se han eliminado correctamente
        // No necesitas devolver el libro eliminado aquí
        return null;
      } else {
        return null; // No se encontró el libro con el ID especificado o no se eliminaron registros
      }
    } catch (error) {
      console.error("Error al eliminar el libro y las reseñas asociadas:", error);
      return null;
    }
  }

  async updateBook(
    id: number,
    title: string,
    author: string,
    img_url: string,
    status: boolean,
    is_loaded: boolean
  ): Promise<Book | null> {
    try {
      const sql = `
        UPDATE BOOKS
        SET
          title = ?,
          author = ?,
          img_url = ?,
          status = ?,
          is_loaded = ?
        WHERE id = ?
      `;
      const params: any[] = [title, author, img_url, status, is_loaded, id];
  
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
      console.error("Error al actualizar el libro:", error);
      return null; // Puedes manejar el error de alguna manera adecuada
    }
}
async getBookFilter(filter: string, title?: string, author?: string): Promise<Book[] | null> {
  try {
      let sql: string;
      let value: string | undefined;

      switch (filter) {
          case 'title':
              if (!title) throw new Error("Se requiere el titulo para filtrar");
              sql = 'SELECT * FROM books WHERE title = ?'
              value = title;
              break;
          case 'author':
              if (!author) throw new Error("Se requiere el autor para filtrar");
              sql = 'SELECT * FROM books WHERE author = ?'
              value = author;
              break;
          default:
              throw new Error('Invalid filter type')
      }
      const [rows]: any = await query(sql, [value]);
      if (!rows || rows.length === 0) {
          throw new Error("No se encontraron resultados.");
      }

      return rows.map((row: Book) => new Book(
          row.id,
          row.title,
          row.author,
          row.img_url,
          row.status,
          row.is_loaded
      ));
  } catch (error) {
      throw error; // Lanza el error para que se maneje en el controlador
  }
} 
async getBookReview(): Promise<any[] | null> {
    const sql = `
        SELECT
            b.id AS book_id,
            b.title AS book_title,
            b.author AS book_author,
            b.img_url AS book_img_url,  
            b.status AS book_status,    
            b.is_loaded AS book_is_loaded,  
            r.id AS review_id,
            r.id_user AS id_user,
            r.review_text AS review_text
        FROM
            books AS b
        JOIN
            Review AS r ON b.id = r.id_Book;
    `;

    try {
        const [result]: any = await query(sql, []);
        const dataBooks = Object.values(JSON.parse(JSON.stringify(result)));

        // Crear un mapa para agrupar las reseñas por libro
        const booksWithReviewsMap = dataBooks.reduce((acc: Map<number, any>, item: any) => {
            const bookId = item.book_id;

            if (!acc.has(bookId)) {
                // Crear una nueva entrada en el mapa para el libro
                acc.set(bookId, {
                    id: bookId,
                    title: item.book_title,
                    author: item.book_author,
                    img_url: item.book_img_url,
                    status: item.book_status,
                    is_loaded: item.book_is_loaded,
                    reviews: [], // Inicialmente, el libro no tiene reseñas
                });
            }

            // Agregar la reseña al libro correspondiente en el mapa
            const book = acc.get(bookId)!;
            book.reviews.push({
                id: item.review_id,
                id_user:item.id_user,
                review_text: item.review_text,
            });

            return acc;
        }, new Map<number, any>());

        // Obtener la lista de libros con reseñas del mapa
        const booksWithReviews: any[] = [...booksWithReviewsMap.values()];

        return booksWithReviews;
    } catch (error) {
        console.error("Error al obtener la lista de libros con reseñas:", error);
        return null;
    }
}
  

}

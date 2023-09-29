//import { query } from '../../database/postgresql';

import { query } from '../../../database/mysql';
import { Book } from '../../domain/entities/book';
import { BookRepository } from '../../domain/repositories/bookRepository';



export class MysqlBookRepository implements BookRepository{

  async agregarBook(title: string, author: string, img_url: string, status: boolean, is_loaded: boolean): Promise<Book|null> {
   try {
       const sql = "INSERT INTO BOOKS (title,author,img_url,status,is_loaded) VALUES(?,?,?,?,?)";
       const params: any[] = [title,author,img_url,status,is_loaded];
       const [result]:any = await query(sql,params);
       return new Book(result.id,title,author,img_url,status,is_loaded);
   } catch (error) {
       return null;
   }
}

async obetenerBook():Promise<Book[]|null>{
  const sql = "SELECT * FROM BOOKS";
  try { 
      const [result]: any = await query(sql,[]);
      const  dataBooks = Object.values(JSON.parse(JSON.stringify(result)))

      return (dataBooks).map((book:any)=>new Book(book.id, book.title,book.author,book.img_url,book.status, book.is_loaded));
    } catch (error) {
      console.error("No se peude obetener los libros:", error);
      return null;
    }
}

async obtenerBookById(id: number): Promise<Book | null> {
  try {
    const sql = "SELECT * FROM BOOKS WHERE id = ?";
    const params: any[] = [id];
    const [result]: any = await query(sql, params);

    if (result && result.length > 0) {
      const bookData = result[0];
      return new Book( bookData.id,bookData.title,bookData.author,bookData.img_url,bookData.status,bookData.is_loaded);
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
    const existingBook = await this.obtenerBookById(id)
    if (!existingBook) {
      return null; // No se encontró una revisión con el ID especificado
    }
    const updateBookInactive = new Book(
      existingBook.id,
      existingBook.title,
      existingBook.author,
      existingBook.img_url,
      false,
      existingBook.is_loaded
    );

    const sql = "UPDATE BOOKS SET status = ? WHERE id = ?";
    const params:any[] = [updateBookInactive.status,updateBookInactive.id];
    await query(sql,params);

    return updateBookInactive;
    
  } catch (error) {
    console.error("Error al actualizar el estado del libro:", error);
    return null; // Puedes manejar el error de alguna manera adecuada
  }
}

async getInactiveBook(status: boolean): Promise<Book[] | null> {
  try {
    const sql = "SELECT * FROM BOOKS WHERE status = ?";
    const params: any[] = [status];

    const [result]: any = await query(sql, params);

    if (result && result.length > 0) {
      const inactiveBooks = result.map((bookData: any) => new Book(bookData.id,bookData.title,bookData.author,bookData.img_url,bookData.status,bookData.is_loaded));
      return inactiveBooks;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los books inactives:", error);
    return null;
  }
}

  async prestarBook(id: number): Promise<Book | null> {
    try {
      const existingBook = await this.obtenerBookById(id);
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
    }  }

    async devolverAlmacen(id: number): Promise<Book | null> {
      try {
        const existingBook = await this.obtenerBookById(id);
        if (!existingBook) {
          return null; // No se encontró una revisión con el ID especificado
        }

        const updateBookStore = new Book(
          existingBook.id,
          existingBook.title,
          existingBook.author,
          existingBook.img_url,
          existingBook.status,
          false
        );
        const sql = "UPDATE BOOKS SET is_loaded = ? WHERE id = ?";
        const params:any[] = [updateBookStore.is_loaded,updateBookStore.id];
        await query(sql,params);

        return updateBookStore;
      } catch (error) {
        console.error("Error al actualizar el campo 'is_loaded' del libro:", error);
        return null; 
      }
  }

}

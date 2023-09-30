import { validate } from "class-validator";
import { BookRepository } from "../domain/repositories/bookRepository";
import { ValidationIdBook } from "../domain/validation/validationBook";
import { Book } from "../domain/entities/book";

export class GetBookByIdUseCasa {
    constructor(readonly bookRepository: BookRepository) { }
  
    async getBookById(id: number): Promise<Book | null> {
  
      let valitationPost = new ValidationIdBook(id);
      const validation = await validate(valitationPost)
      
      if (validation.length > 0) {
        throw new Error(JSON.stringify(validation));
      }
  
      try {
        const books = await this.bookRepository.getBookById(id);
        return books;
      } catch (error) {
        console.error("Error al obtener la lista de libros por usuario:", error);
        return null;
      }
    }
  }
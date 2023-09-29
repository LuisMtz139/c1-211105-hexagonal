import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";
import { validate } from "class-validator";
import { ValidationIdBook } from "../domain/validation/validationBook";

export class ObtenerBookByIdUseCase {
    constructor(readonly bookRepository: BookRepository) { }
  
    async obtenerBookByid(id: number): Promise<Book | null> {
  
      let valitationPost = new ValidationIdBook(id);
      const validation = await validate(valitationPost)
      
      if (validation.length > 0) {
        throw new Error(JSON.stringify(validation));
      }
  
      try {
        const books = await this.bookRepository.obtenerBookById(id);
        return books;
      } catch (error) {
        console.error("El se puede obtener un book con ese id:", error);
        return null;
      }
    }
  }
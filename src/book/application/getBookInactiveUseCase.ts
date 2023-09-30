import { validate } from "class-validator";
import { BookRepository } from "../domain/repositories/bookRepository";
import { ValidationStatusBook } from "../domain/validation/validationBook";
import { Book } from "../domain/entities/book";


export class GetBookInactiveUseCase{
    constructor(readonly bookRepository: BookRepository ){}

    async getInactive(status: boolean): Promise<Book[] | null> {
      
      let valitationPost = new ValidationStatusBook(status);
      const validation = await validate(valitationPost)
      if (validation.length > 0) {
          throw new Error(JSON.stringify(validation));
      }

        try {
          // Llama al método del repositorio que obtiene los libros inactivos
          const inactiveBooks = await this.bookRepository.getBookInactive(status);
    
          return inactiveBooks;
        } catch (error) {
          console.error("Error al obtener la lista de libros inactivos:", error);
          return null; // Puedes manejar el error de alguna manera adecuada
        }
      }
}
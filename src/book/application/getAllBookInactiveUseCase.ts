import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";


export class GetBookAllInactiveUseCase{
    constructor(readonly bookRepository: BookRepository ){}

    async getAllInactive(status: string): Promise<Book[] | null> {
        try {
          // Llama al método del repositorio que obtiene los libros inactivos
          const inactiveBooks = await this.bookRepository.getAllBookInactive(status);
    
          return inactiveBooks;
        } catch (error) {
          return null;
        }
      }
}
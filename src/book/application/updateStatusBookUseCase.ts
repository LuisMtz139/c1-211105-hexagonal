import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";


export class UpdateStatusUseCase{
    constructor(readonly bookRepository: BookRepository){}

    async updateStatus(id: number, newStatus: string): Promise<Book | null> {
        try {
          // Obtén el libro que deseas actualizar
          const bookToUpdate = await this.bookRepository.getBookById(id)
    
          if (!bookToUpdate) {
            return null; 
          }
          
          const updatedBook = new Book(bookToUpdate.id,bookToUpdate.title,bookToUpdate.author,bookToUpdate.img_url, newStatus,  bookToUpdate.is_loaded);
    
          await this.bookRepository.updataStatus(id, newStatus);
    
          return updatedBook;
        } catch (error) {
          console.error('Error al actualizar el estado del libro:', error);
          return null; // Puedes manejar el error de alguna manera adecuada
        }
      }
}
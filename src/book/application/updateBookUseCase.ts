import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";

export class UpdateBookUseCase{
    constructor(readonly bookRepository: BookRepository){}

    async upadateBook(id:number, is_loaded: boolean): Promise<Book | null>{
        try {
            
            const bookToUpdate = await this.bookRepository.getBookById(id);
            if(!bookToUpdate){
                return null;
            }

            const updateBook = new Book(
                bookToUpdate.id,
                bookToUpdate.title,
                bookToUpdate.author,
                bookToUpdate.img_url,
                bookToUpdate.status,
                is_loaded
            )
            
            await this.bookRepository.updateBook(id,is_loaded);

            return updateBook;

            
        } catch (error) {
            console.error('Error al actualizar el estado del libro:', error);
            return null;
            
        }
    }
}
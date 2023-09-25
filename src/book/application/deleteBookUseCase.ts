import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";


export class DeleteBookUseCase{
    constructor(readonly bookRepository : BookRepository){}

    async delete(id: number): Promise<Book|null> {
        return this.bookRepository.deleteBook(id);
    }

}
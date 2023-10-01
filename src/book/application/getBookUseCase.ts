import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";

export class GetBooksUseCase{
    constructor (readonly bookRepository : BookRepository){}

    async getAll():Promise<Book[]|null>{
        try {
            const book = await this.bookRepository.getAll();
            return book;
        } catch (error) {
            return null;
        }
    }


}
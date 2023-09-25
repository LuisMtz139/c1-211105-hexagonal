import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";





export class GetBookByIdUseCase{
    constructor (readonly bookRepository: BookRepository ){}

    async getBook(id:number):Promise<Book|null>{
        try {
            const books = await this.bookRepository.getBookById(id);
            return books;
          } catch (error) {
            return null;
          }
    }
}
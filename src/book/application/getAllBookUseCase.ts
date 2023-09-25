import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";


export class GetAllBookUseCase{
    constructor (readonly bookRepository : BookRepository){}

    async getAllBook():Promise<Book[]|null>{
        try {
            const book = await this.bookRepository.getAllBook();
            return book;
        } catch (error) {
            return null;
        }
    }


}
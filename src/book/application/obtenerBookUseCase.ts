import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";

export class ObtenerBookUseCase{
    constructor (readonly bookRepository : BookRepository){}

    async obtenerBook():Promise<Book[]|null>{
        try {
            const book = await this.bookRepository.obetenerBook();
            return book;
        } catch (error) {
            return null;
        }
    }
}
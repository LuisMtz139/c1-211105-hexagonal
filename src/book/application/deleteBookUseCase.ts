import { validate } from "class-validator";
import { BookRepository } from "../domain/repositories/bookRepository";
import { ValidationIdBook } from "../domain/validation/validationBook";
import { Book } from "../domain/entities/book";

export class DeleteBookUseCase{
    constructor(readonly bookRepository : BookRepository){}

    async deleteBook(id: number): Promise<Book|null> {
        
        let valitationPost = new ValidationIdBook(id);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        return this.bookRepository.deleteBook(id);
    }

    

}
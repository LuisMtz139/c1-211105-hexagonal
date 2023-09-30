import { validate } from "class-validator";
import { BookRepository } from "../domain/repositories/bookRepository";
import { ValidationCreateBook } from "../domain/validation/validationBook";
import { Book } from "../domain/entities/book";


export class CreateBookUserCase {

    constructor(readonly bookRepository: BookRepository) { }

    async create(title: string,author: string,img_url: string,status: boolean,is_loaded: boolean,): Promise<Book | null> {

        let valitationPost = new ValidationCreateBook(title, author, img_url, status, is_loaded);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const createBook = await this.bookRepository.createBook(title,author,img_url,status,is_loaded);
            return createBook;
        } catch (error) {
            return null
        }
    }

}
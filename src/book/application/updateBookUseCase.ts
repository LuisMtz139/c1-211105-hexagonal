import { validate } from "class-validator";
import { Book } from "../domain/entities/book";
import { validationUpdateBook } from "../domain/validation/validationBook";
import { BookRepository } from "../domain/repositories/bookRepository";

export class UpdateBookUseCase {
    constructor(private readonly bookRepository: BookRepository) {}
  
    async update(id: number,title: string,author: string,img_url: string,status: boolean,is_loaded: boolean
    ): Promise<Book | null> {
  
      let valitationUpdate = new validationUpdateBook(id,title, author, img_url, status, is_loaded);
          const validation = await validate(valitationUpdate)
          if (validation.length > 0) {
              throw new Error(JSON.stringify(validation));
        }
      try {
        const updatedBook = await this.bookRepository.updateBook(id,title,author,img_url,status,is_loaded);
        return updatedBook;
      } catch (error) {
        return null;
      }
    }
  }
import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";

export class UpdateBokUseCase {
    constructor(private readonly bookRepository: BookRepository) {}
  
    async update( id: number, title: string, author: string, img_url: string, status: string, is_loaded: boolean ): Promise<Book | null> {
      try {
        const updatedBook = await this.bookRepository.updateBookss(id,title,author,img_url, status,is_loaded );
        return updatedBook;
      } catch (error) {
        return null;
      }
    }
  }
import { validate } from "class-validator";
import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";
import { ValidationIdBook } from "../domain/validation/validationBook";


export class UpdateBookStoreUseCase{
    constructor(readonly bookRepository: BookRepository){}

    async updateStore(id: number): Promise<{ book: Book | null; message?: string }>{
        const getLoad = await this.bookRepository.getBookById(id);
        
        if (!getLoad) {
            return { book: null };
        }
        if (getLoad.status) {
            return { book: getLoad, message: 'El campo libro ya estaba en el almacen.'};
        }

        let valitationPost = new ValidationIdBook(id);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
        throw new Error(JSON.stringify(validation));
        }

        const storeUpdate = await this.bookRepository.updateBookStore(id)

        if (!storeUpdate) {
            return { book: null }; // Error al actualizar la revisión
          }
          return { book: storeUpdate };
    }
}
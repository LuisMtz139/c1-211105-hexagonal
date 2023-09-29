import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";
import { validate } from "class-validator";
import { ValidationIdBook } from "../domain/validation/validationBook";


export class PrestarBookUseCase{
    constructor(readonly bookRepository: BookRepository){}

    async prestarBook(id: number): Promise<{ book: Book | null; message?: string }>{
        const getLoad = await this.bookRepository.prestarBook(id);
        if (!getLoad) {
            return { book: null };
        }
        if (getLoad.status) {
            return { book: getLoad, message: 'El campo "Load" ya estaba en true.' };
        }
        
        let valitationPost = new ValidationIdBook(id);
        const validation = await validate(valitationPost)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        const loadUpdate = await this.bookRepository.prestarBook(id)

        if (!loadUpdate) {
            return { book: null }; // Error al actualizar la revisión
          }
          return { book: loadUpdate };
    }
}
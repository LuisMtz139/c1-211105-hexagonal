import { Book } from "../domain/entities/book";
import { BookRepository } from "../domain/repositories/bookRepository";
import { validate } from "class-validator";
import { ValidationIdBook } from "../domain/validation/validationBook";


export class UpdateStatusUseCase {
    constructor(readonly bookRepository: BookRepository) {}
  
    async updateStatus(id: number): Promise<{ book: Book | null; message?: string }> {
      // Validar el ID antes de continuar
      const validationErrors = await validate(new ValidationIdBook(id));
  
      if (validationErrors.length > 0) {
        throw new Error("ID inválido. Debe ser un número.");
      }
  
      // Obtén el libro que deseas actualizar
      const updateStatus = await this.bookRepository.obtenerBookById(id);
  
      if (!updateStatus) {
        return { book: null };
      }
  
      if (!updateStatus.status) {
        return { book: updateStatus, message: 'El campo "status" ya estaba en false.' };
      }
  
      let valitationPost = new ValidationIdBook(id);
          const validation = await validate(valitationPost)
          if (validation.length > 0) {
              throw new Error(JSON.stringify(validation));
      }
  
      const statusUpdate = await this.bookRepository.updataStatus(id);
  
      if (!statusUpdate) {
        return { book: null }; // Error al actualizar la revisión
      }
      return { book: statusUpdate };
    }
  }
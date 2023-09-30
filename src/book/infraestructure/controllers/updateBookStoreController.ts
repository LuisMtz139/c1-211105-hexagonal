import { UpdateBookStoreUseCase } from "../../application/updateBookStoreUseCase";
import { Request, Response } from "express";

export class UpdateBookStoreController {
    constructor(private readonly updateBookStoreUseCase: UpdateBookStoreUseCase) {}
  
    async updateBookStore(req: Request, res: Response) {
      try {
  
        const { id} = req.params;
  
        const updateStore = await this.updateBookStoreUseCase.updateStore(Number(id))
  
        if (updateStore.book) {
          res.status(200).json({ success: true, message: 'Valor "status" actualizado a false.', book: updateStore });
        }else if(updateStore.message){
          return res.status(200).json({ success: true, message: updateStore.message, book: null });
        }
        else {
          res.status(404).json({ success: false, message: 'La revisión con el ID especificado no fue encontrada.' });
        }
        
      } catch (error) {
          if (error instanceof Error) {
  
            if (error.message.startsWith('[')) {
              
              return res.status(400).send({
                status: "error",
                message: "Validation failed",
                errors: JSON.parse(error.message)
              });
            }
          }
          return res.status(500).send({
            status: "error",
            message: "An error occurred while adding the book."
          });
      }
    }
  }
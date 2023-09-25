import { DeleteBookUseCase } from "../../application/deleteBookUseCase";
import { Request, Response } from "express";



export class DeleteBooController {
    constructor(readonly deleteBookUseCase: DeleteBookUseCase) {}
  
    async deleteBook(req: Request, res: Response) {
      try {
        const id = Number(req.params.id);
  
        if (!id) {
          return res.status(400).send({
            status: "error",
            data: [],
            validations: [],
            message: "El campo 'id' es requerido ",
          });
        }
  
        const deleted = await this.deleteBookUseCase.delete(id);
  
        if (deleted) {
          return res.status(200).send({
            status: "success",
            data: {},
            message: "Se elimino",
          });
        } else {
          return res.status(404).send({
            status: "error",
            data: [],
            message: "No se encontro con el id",
          });
        }
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
        return res.status(500).send({
          status: "error",
          data: [],
          message: "Error interno",
        });
      }
    }
  }
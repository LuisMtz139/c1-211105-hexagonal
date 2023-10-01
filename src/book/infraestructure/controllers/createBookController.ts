import { Response, Request } from "express";
import { CreateBookUserCase } from "../../application/createBookUseCase";

export class CreateBookController {
  constructor(readonly createBookUserCase: CreateBookUserCase) { }

  async create(req: Request, res: Response) {
    try {

      let { title, author, img_url, status, is_loaded } = req.body;

      const createBook = await this.createBookUserCase.create( title, author, img_url, status, is_loaded, )
      if (createBook) {
        return res.status(201).send({
          status: "success",
          data: {id: createBook.id,title: createBook.title,author: createBook.author,img_url: createBook.img_url,status: createBook.status,is_loaded: createBook.is_loaded,},
          message: "El prospecto ha sido creado exitosamente",
        });
      } else {
        res.status(400).send({
          status: "error",
          data: [],
          validations: [],
          message: "Error al crear un cliente prospecto, inténtalo más tarde",
        });
      }

    }catch (error) {
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


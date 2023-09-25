import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../application/updateUserUseCase";

export class UpdateUserController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async updateUser(req: Request, res: Response) {
    try {
      const {
        id,
        name,
        password,
        email,
        status
      } = req.body;

      // Aquí se llama al caso de uso para actualizar el usuario con todos los campos
      const updatedUser = await this.updateUserUseCase.updateUser(id, {
        name,
        password,
        email,
        status
      });

      if (updatedUser) {
        return res.status(200).json({
          status: "success",
          data: {
            updated_user: updatedUser
          }
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: `No se pudo encontrar ID ${id}`
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al actualizar"
      });
    }
  }
}

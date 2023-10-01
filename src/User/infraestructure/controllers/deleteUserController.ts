import { DeleteUserUseCase } from "../../application/deleteUsersUseCase";
import { Request, Response } from "express";


export class DeleteUserController{
    constructor(
         readonly deleteUserUseCase: DeleteUserUseCase,
    ) {}

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId; // Assuming userId is in the URL params
            const userDeleted = await this.deleteUserUseCase.run(userId);

            if (userDeleted) {
                return res.status(200).json({
                    status: "success",
                    message: "Usuario eliminado"
                });
            }

            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado o no se puede eliminar"
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({
                status: "error",
                message: "Error inesperado porfavor intente de nuevo"
            });
        }
    }

}
import { Request, Response } from "express";
import { IniciarSesionUseCase } from '../../application/iniciarSesionUseCase';

export class IniciarSesionUserController {
    constructor(
        readonly iniciarSesionUseCase: IniciarSesionUseCase,
    ) {}

    async iniciarSesion(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    status: "error",
                    message: "El email y la contraseña son obligatorios.",
                });
            }

            const user = await this.iniciarSesionUseCase.run(email, password);

            if (user) {
                return res.status(200).json({
                    status: "success",
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        status: user.status,
                    },
                    message: "Inicio de sesión exitoso.",
                });
            } else {
                return res.status(401).json({
                    status: "error",
                    message: "Credenciales inválidas. Verifica tu email y contraseña.",
                });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return res.status(500).json({
                status: "error",
                message: "Error al iniciar sesión.",
            });
        }
    }
}

import * as express from 'express';
import { activeUserController, addUserContoller, cerrarSesionController, deleteUserController, devolverLibroController, eliminarResenaController, escribirResenaController, filterUserController, getUserByIdController, iniciarSesionUserController, listInactiveUserController, prestarLibroController, updatePasswordUserController, updateUserController, usersContoller } from '../dependencies';
import { AddUserContoller } from '../controllers/addUserController';

export const userRouter = express.Router();

//agregar un usuario 
userRouter.post(
    //ejemplo de funcionamiento
    //user+direccion
    "/addUser/",
    addUserContoller.addUser.bind(addUserContoller)
)
//eliminar
userRouter.delete(
    //eliminar
    "/deleteUser/:userId",
    deleteUserController.deleteUser.bind(deleteUserController)
)
//obtener usuarios
userRouter.get(
    //listar todo
    "/listUser",
    usersContoller.listAllUsers.bind(usersContoller)
)
//obtner todos los usuarios por el id
userRouter.get(
    "/getUser/:id",
     getUserByIdController.getUserId.bind(getUserByIdController)
)
//actualizar contraseña
userRouter.put(
    '/updatePassword/',
    updatePasswordUserController.updatePassword.bind(updatePasswordUserController)
)
//actualizar datos del usuario
userRouter.put(
    '/updateUser/',
    updateUserController.updateUser.bind(updateUserController)
)
//activar usuario
userRouter.post(
    '/activate',
    activeUserController.run.bind(activeUserController)
)

//obtener todos los usuarios con status inactivo
userRouter.get(
    '/inactive',
    listInactiveUserController.run.bind(listInactiveUserController)    
)
//filtrar datos del usuario por name o email
userRouter.get(
    '/filter',
    filterUserController.run.bind(filterUserController)
  );
//iniciarSesion
  userRouter.post(
    '/iniciarSesion',
    iniciarSesionUserController.iniciarSesion.bind(iniciarSesionUserController)
);

//CerrarSesion
userRouter.post(
    '/cerrarSesion',
    cerrarSesionController.run.bind(cerrarSesionController)
)

//prestarLibro
userRouter.post(
    '/prestarLibro',
    prestarLibroController.prestarLibroUser.bind(prestarLibroController)
);
//devolver libro
userRouter.post(
    '/devolverLibro',
    devolverLibroController.devolverLibroUser.bind(devolverLibroController)
);

//eliminarReseña
userRouter.delete(
    '/eliminarResena/:userId/:reviewId', // Ruta para eliminar una reseña asociada a un usuario
    eliminarResenaController.eliminarResena.bind(eliminarResenaController)
);
//escribir una resena
userRouter.post(
    '/escribirResena',
    escribirResenaController.escribirResena.bind(escribirResenaController)
);
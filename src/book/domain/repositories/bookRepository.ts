import { Book } from "../entities/book";


export interface BookRepository{
    //agregar libro
    agregarBook(title:string,author: string,img_url:string,status:boolean,is_loaded: boolean):Promise<Book | null>; 

    //OBETENER TODOS LOS LIBROS
    obetenerBook():Promise<Book[] | null>;

    //obetener book by id
    obtenerBookById(id:number):Promise<Book|null>; 

    //actualizar status
    updataStatus(id:number):Promise<Book | null>;
    
    //ObtenerTodos los libros inactivados
    getInactiveBook(status:boolean):Promise<Book[]|null>; 

    //hacer un prestamo del libro 
    prestarBook(id:number):Promise<Book | null>;

    //devolver al almacen 
    devolverAlmacen(id:number):Promise<Book | null>;
}

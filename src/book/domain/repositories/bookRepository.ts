import { Book } from "../entities/book";


export interface BookRepository{
    //agregar book
    createBook(title:string,author: string,img_url:string,status:boolean,is_loaded: boolean):Promise<Book | null>;
    
    //traer todo
    getAll():Promise<Book[] | null>;

    //getbookbyId
    getBookById(id:number):Promise<Book|null>;
    
    //actualizar estaddo
    updataStatus(id:number):Promise<Book | null>;

    // todos los libros inactivos
    getBookInactive(status:boolean):Promise<Book[]|null>;

    //actualizar loadeed sttaus
    updateBookLoaded(id:number):Promise<Book | null>;

    //libro devuelto
    updateBookStore(id:number):Promise<Book | null>;
    
    //elimnarBook
    deleteBook(id:number):Promise<Book | null>;

    //actualizar book
    getBookReview():Promise<any[]| null>

    updateBook(id: number,title: string,author: string,img_url: string,status: boolean,is_loaded: boolean): Promise<Book | null> //Yap

    getBookFilter(filter: string,title?: string,author?: string,):Promise<Book[] | null>
}   


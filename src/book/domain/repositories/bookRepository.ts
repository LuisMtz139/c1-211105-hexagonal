import { Book } from "../entities/book";


export interface BookRepository{
    createBook(title:string,author: string,img_url:string,status:string, is_loaded: boolean):Promise<Book | null>;


    getAllBook():Promise<Book[] | null>;

    getBookById(id:number):Promise<Book|null>;
    updataStatus(id:number, newStatus: string):Promise<Book | null>;

    getAllBookInactive(status:string):Promise<Book[]|null>;

    updateBook(id:number,is_loaded:boolean ):Promise<Book | null>;

    deleteBook(id:number):Promise<Book | null>;


    updateBookss(id: number,title: string, author: string, img_url: string, status: string, is_loaded: boolean): Promise<Book | null>
}

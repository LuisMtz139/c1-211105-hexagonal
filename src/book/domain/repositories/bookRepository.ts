import { Book } from "../entities/book";


export interface BookRepository{
    createBook(title:string,author: string,img_url:string,status:string, is_loaded: boolean):Promise<Book | null>;


    getAllBook():Promise<Book[] | null>;


}

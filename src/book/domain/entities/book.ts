export class Book{
    constructor(
        readonly id: number,
        readonly title: string,
        readonly author: string,
        readonly img_url:string,
        readonly status:string,
        readonly is_loaded: boolean
    ){}
}
export class Review{
    constructor(
        readonly id: number,
        readonly id_user:number,
        readonly id_book:number, 
        readonly review_text: string,
        readonly status: boolean
    ){}
}
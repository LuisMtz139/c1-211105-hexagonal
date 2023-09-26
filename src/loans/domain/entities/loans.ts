export class Loan {
    constructor(
        readonly id: number,
        readonly prestamo: string,
        readonly entrega: string,
        readonly estado: string,
        readonly id_Book: number,
        readonly id_User: number
    ) {}
}
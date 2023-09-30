export class Loan {
    constructor(
        readonly id: number,
        readonly loan: string,//prestamo
        readonly delivery: string,//entrega
        readonly status: boolean,
        readonly id_Book: number,
        readonly id_User: number
    ) {}
}

export class User{
    token: string | undefined;
    constructor(
        readonly id:number,
        readonly name:string,
        readonly password:String,
        readonly email:String,
        readonly status: String,
    ){}
}
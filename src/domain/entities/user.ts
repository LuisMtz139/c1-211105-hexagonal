export class User{
    constructor(
        readonly id:number,
        readonly name:string,
        readonly password:String,
        readonly email:String,
        readonly status: String,
    ){}
}
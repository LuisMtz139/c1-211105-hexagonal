import { IsOptional ,IsEmail,IsNumber, IsNotEmpty, IsString, IsBoolean,IsIn,ValidateIf} from 'class-validator';


export class ValidationCreateUser {
    
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;


    constructor(
        name: string,
        email: string,
        password: string,
        status: boolean,
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.status = status;
    }
}

export class updateUserValidation{
    @IsOptional() // Permite que este campo sea opcional al actualizar
    @IsString()
    public name?: string;

    @IsOptional()
    @IsString()
    public password?: string;

    @IsOptional()
    @IsEmail() // Puedes validar si el email es una dirección de correo electrónico válida
    public email?: string;

    @IsOptional()
    @IsBoolean()
    public status?: boolean;
    
    constructor(
        name?: string,
        email?: string,
        password?: string,
        status?: boolean,
    ) {
        this.name = name,
        this.email = email,
        this.password = password,
        this.status = status
    }

}

export class ValidationIdUser{
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    constructor(
        id:number,
        
    ) {
        this.id= id;
    }
}

export class ValidationUserIdCamp{

    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsString()
    public text: string;
    
    constructor(
        id: number,
        text: string,
    ) {
        this.id = id,
        this.text = text
    }

}

export class ValidationUserBookId{
    @IsNotEmpty()
    @IsNumber()
    public id_user: number;

    @IsNotEmpty()
    @IsNumber()
    public id_book: number;

    constructor(
        id_user:number,
        id_book:number,
        
    ) {
        this.id_user= id_user;
        this.id_book= id_book;
    }
}

export class ValidationUserBook{
    @IsNotEmpty()
    @IsNumber()
    public id_user: number;

    @IsNotEmpty()
    @IsNumber()
    public id_book: number;

    @IsNotEmpty()
    @IsString()
    public text: string;

    constructor(
        id_user:number,
        id_book:number,
        text:string,
        
    ) {
        this.id_user= id_user;
        this.id_book= id_book;
        this.text= text;
    }
}

export class ValidationLogin {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    

    constructor(
        
        email: string,
        password: string,
        
    ) {
        this.email = email;
        this.password = password
    }
        
}
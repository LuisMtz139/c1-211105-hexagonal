import { IsNumber, IsNotEmpty, IsString, IsBoolean,IsIn,ValidateIf} from 'class-validator';


export class ValidationCreateLoan {
    
    @IsNotEmpty()
    @IsString()
    public loan: string;

    @IsNotEmpty()
    @IsString()
    public delivery: string;


    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;

    @IsNotEmpty()
    @IsNumber()
    public id_Book: number;

    @IsNotEmpty()
    @IsNumber()
    public id_User: number;

    constructor(
        loan: string,
        delivery: string,
        status: boolean,
        id_Book: number,
        id_User: number,
    ) {
        this.loan = loan;
        this.delivery = delivery;
        this.status = status;
        this.id_Book = id_Book;
        this.id_User = id_User;
    }
}

export class validationUpdateLoan{

    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsString()
    public loan: string;

    @IsNotEmpty()
    @IsString()
    public delivery: string;


    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;

    @IsNotEmpty()
    @IsNumber()
    public id_Book: number;

    @IsNotEmpty()
    @IsNumber()
    public id_User: number;

    constructor(
        id: number,
        loan: string,
        delivery: string,
        status: boolean,
        id_Book: number,
        id_User: number,
    ) {
        this.id = id;
        this.loan = loan;
        this.delivery = delivery;
        this.status = status;
        this.id_Book = id_Book;
        this.id_User = id_User;
    }

}

export class ValidationIdLoan{
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    constructor(
        id:number,
        
    ) {
        this.id= id;
    }
}




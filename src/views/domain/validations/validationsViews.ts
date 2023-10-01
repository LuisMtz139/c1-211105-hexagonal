import { IsNumber, IsNotEmpty, IsString, IsBoolean,IsIn,ValidateIf} from 'class-validator';


export class ValidationCreateViews{
    
    @IsNotEmpty()
    @IsNumber()
    public id_user: number;

    @IsNotEmpty()
    @IsNumber()
    public id_book: number;

    @IsNotEmpty()
    @IsString()
    public review_text: string;

    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;


    constructor(
        id_user: number,
        id_book: number,
        review_text: string,
        status: boolean,
    ) {
        this.id_user = id_user;
        this.id_book = id_book;
        this.review_text = review_text;
        this.status = status;
    }
}



export class ValidationByIdViews{
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    constructor(
        id:number,
        
    ) {
        this.id= id;
    }
}


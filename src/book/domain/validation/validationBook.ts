import { IsNumber, IsNotEmpty, IsString, IsBoolean,IsIn,ValidateIf} from 'class-validator';


export class ValidationCreateBook {
    
    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public author: string;

    @IsNotEmpty()
    @IsString()
    public img_url: string;

    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;

    @IsNotEmpty()
    @IsBoolean()
    public is_loaded: boolean;

    constructor(
        title: string,
        author: string,
        img_url: string,
        status: boolean,
        is_loaded: boolean,
    ) {
        this.title = title;
        this.author = author;
        this.img_url = img_url;
        this.status = status;
        this.is_loaded = is_loaded;
    }
}

export class validationUpdateBook{

    @IsNotEmpty()
    @IsNumber()
    public id: number;

    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public author: string;

    @IsNotEmpty()
    @IsString()
    public img_url: string;

    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;

    @IsNotEmpty()
    @IsBoolean()
    public is_loaded: boolean;

    constructor(
        id:number,
        title: string,
        author: string,
        img_url: string,
        status: boolean,
        is_loaded: boolean,
    ) {
        this.id= id;
        this.title = title;
        this.author = author;
        this.img_url = img_url;
        this.status = status;
        this.is_loaded = is_loaded;
    }

}

export class ValidationIdBook{
    @IsNotEmpty()
    @IsNumber()
    public id: number;

    constructor(
        id:number,
        
    ) {
        this.id= id;
    }
}

export class ValidationStatusBook{

    @IsNotEmpty()
    @IsBoolean()
    public status: boolean;

    constructor(
        status:boolean,
        
    ) {
        this.status= status;
    }
}

export class ValidatorFilter {
    @IsNotEmpty()
    @IsIn(['title', 'author'])
    filter: string;

    @ValidateIf(o => o.filter === 'title')
    @IsNotEmpty()
    title?: string;

    @ValidateIf(o => o.filter === 'author')
    @IsNotEmpty()
    author?: string;

    constructor(
        filter: string,
        title?: string,
        author?: string,
    ){
        this.filter = filter,
        this.title = title,
        this.author = author
    }
}
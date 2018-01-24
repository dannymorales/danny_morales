export interface galleryImage{
    $key?:string;
    name?:string;
    url?:string;
}
export class User{
    uid?:string;
    email?:string;
    password?:string;
}
export class Post{
    $key?:string;
    title?:string;
    description?:string;
}
export class Portfolio{
    id:any;
    title?:string;
    description:string;
}
export class Upload{
    $key?:string;
    name?:string;
    file:File;
    url:string;
    refKey:string;
    progress:number;
    createdOn:any;

    constructor(file: File){
        this.file = file;
    }
}
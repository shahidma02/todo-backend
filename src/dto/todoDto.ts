import { IsString, IsEmail, IsIn, IsNumber } from "class-validator";

export class TodoDTO {
    @IsString()
    title: string;

    @IsString()
    description: string;  

    @IsString()
    @IsIn(['Pending', 'Completed']) 
    status: 'Pending' | 'Completed';
}

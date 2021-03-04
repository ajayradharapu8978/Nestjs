import { IsNotEmpty } from "class-validator";

export class UniversityDto{

    @IsNotEmpty()
    universityName: string;
    
    @IsNotEmpty()
    country: string;
    
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    phone: string;
    
    @IsNotEmpty()
    address: string;
    
    @IsNotEmpty()
    Website: string;
}
import { IsString,IsNumber,IsDateString, isNumber } from "class-validator"; 


export class CreateWeatherLogDto{
    @IsDateString ()
    timestamp: string;
    
    @IsString ()
    city: string;

    @IsNumber ()
    temperatura: number;

    @IsNumber ()
    humidity: number;

    @IsNumber()
    windSpeed: number;

    @IsString ()
    condition: string;

}


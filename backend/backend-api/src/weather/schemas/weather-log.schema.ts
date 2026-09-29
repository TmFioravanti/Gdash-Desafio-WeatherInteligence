import {Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

 @Schema({collection: 'weather-logs', timestamps:true})
 export class WeatherLog extends Document{
    @Prop({required:true})
    timestamp: Date;

    @Prop({required: true})
    city: string;

    @Prop({required: true})
    temperature: number;

    @Prop({Required: true})
    humidity: number;

    @Prop({required: true})
    WindSpeed: number;

    @Prop({required:true})
    condition: string;

 }
export const WeatherLogSchema = SchemaFactory.createForClass(WeatherLog);
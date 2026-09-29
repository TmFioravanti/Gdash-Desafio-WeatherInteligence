import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { WeatherService } from './service/weather.service';
import { CreateWeatherLogDto } from './dto/create-weather-log.dto';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'mongoose';
import * as jwtAuthGuard from '../auth/jwt-auth.guard';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    @Post('logs')
    async create(@Body() dto: CreateWeatherLogDto) {
        return this.weatherService.create(dto);
    }
    @UseGuards(jwtAuthGuard.JwtAuthGuard)
    @Get('logs')
    async findAll(...args: []) {
        return this.weatherService.findAll();
    }
}



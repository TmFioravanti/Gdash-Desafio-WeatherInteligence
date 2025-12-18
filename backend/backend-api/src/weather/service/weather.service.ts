import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { WeatherLog } from "../schemas/weather-log.schema";
import { CreateWeatherLogDto } from "../dto/create-weather-log.dto";
import { Parser as CsvParser } from 'json2csv';
import * as ExcelJS from 'exceljs';
import { timestamp } from "rxjs";


@Injectable()
export class WeatherService {
    constructor(
        @InjectModel(WeatherLog.name) private weatherModel: Model<WeatherLog>,
    ) { }

    async create(dto: CreateWeatherLogDto) {
        const created = new this.weatherModel({
            ...dto,
            timestamp: new Date(dto.timestamp)
        });
        return created.save();
    }
    async findAll() {
        return this.weatherModel.find().sort({ timestamp: -1 }).limit(200).exec();

    }
    async exportCsv(): Promise<string> {
        const data = await this.weatherModel.find().lean().exec();
        const fields = ['timestamp', 'city', 'temperature', 'humidity', 'condition'];
        const parser = new CsvParser({ fields });
        return parser.parse(data);
    }
    async exportXlsx(): Promise<Buffer> {
        const data = await this.weatherModel.find().lean().exec();
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Weather Logs');

        sheet.addRow(['timestamp', 'city', 'temperature', 'humidity', 'wind speed', 'condition']);
        data.forEach((log: any) => {
            sheet.addRow([
                log.timestamp,
                log.city,
                log.temperature,
                log.humidity,
                log.windSpeed,
                log.condition,
            ]);
        });
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
    async getInsights() {
        const logs = await this.weatherModel
            .find()
            .sort({ timestamp: -1 })
            .limit(50)
            .lean()
            .exec();

        if (logs.length === 0) {
            return {
                summary: 'sem dados suficientes para gerar insights.',
                comfortScore: 0,
                trend: 'estável',
            };
        }
        const avgTemp =
            logs.reduce((acc, log: any) => acc + log.temperature, 0) / logs.length;

        const avghumidity =
            logs.reduce((acc, log: any) => acc + log.humidity, 0) / logs.length;

        let comfortScore = 100 - Math.abs(avgTemp - 24) * 3 - (avghumidity - 50) * 0.2;
        if (comfortScore < 0) comfortScore = 0;
        if (comfortScore > 100) comfortScore = 100;

        const trend = 'estável';

        return {
            summary: `Temperatura média: ${avgTemp.toFixed(
                1,
            )}ºC, Umidade média:  ${avghumidity.toFixed(
                1,
            )}%. Conforto estimado: ${comfortScore.toFixed(0)} / 100.`,
            comfortScore: Math.round(comfortScore),
            trend,

        }

    }

}

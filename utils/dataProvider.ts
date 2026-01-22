import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider {

    //Get data from JSON file
    static getDataFromJson(filePath: string) {

        let jsonData: any = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        return jsonData;
    }

    //Get data from CSV file    
    static getDataFromCsv(filePath: string) {

        let csvData:any = parse(fs.readFileSync(filePath, 'utf-8'), { columns: true, skip_empty_lines: true });

        return csvData;

    }
}

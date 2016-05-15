import {Country} from './country';
import {Indicator} from './indicator';

export class WorldDataBankResponse {
    points:[DataPoint];
}

export class DataPoint {
    indicator:Indicator;
    country:Country;
    value:any;
    decimal:string;
    data:string;
}

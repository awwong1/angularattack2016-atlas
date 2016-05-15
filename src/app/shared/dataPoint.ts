import {Country} from './country';
import {Indicator} from './indicator';

export class DataPoint {
    country:Country;
    indicator:Indicator;
    value:any;
    decimal:string;
    date:string;
}

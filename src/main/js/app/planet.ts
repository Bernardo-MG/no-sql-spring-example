
import { Satellite } from 'app/satellite';

export interface Planet {
    satellites: Array<Satellite>;
    name: string;
}
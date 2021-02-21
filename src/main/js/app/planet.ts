
import { Satellite } from 'app/satellite';

/**
 * Planet from a solar system.
 */
export interface Planet {
    satellites: Array<Satellite>;
    name: string;
}
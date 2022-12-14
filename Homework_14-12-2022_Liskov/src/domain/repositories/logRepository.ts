/* eslint-disable semi */
import Repository from './repository';
export default interface LogRepository extends Repository{
    insert (): Promise<void>;
}
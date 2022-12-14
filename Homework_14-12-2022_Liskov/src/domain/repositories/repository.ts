/* eslint-disable semi */
export default interface Repository {
    insert (): Promise<void>;
    get (id: number): Promise<void>;
    update (): Promise<void>;
    delete (): Promise<void>;

}
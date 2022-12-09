import { injectable } from 'inversify';
import UserDataService from '../db/db-services';
import User from '../entities/user';
import { UserRepository } from '../repository/userRepository';

@injectable()
export class UserService implements UserRepository {
    constructor(private userDataService: UserDataService) { }

    public async create(user: User) {
        const result = await this.userDataService.create(user);
            return result;
    }

    public async read(id: number) {
        const data = await this.userDataService.read(id);
            return data;
    }

    public async update(user: User) {
        const result = await this.userDataService.update(user);
            return result;
    }

    public async delete(id: number) {
        const result = await this.userDataService.delete(id);
            return result;
    }
}





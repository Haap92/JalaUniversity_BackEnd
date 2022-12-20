import { injectable } from 'inversify';
import User from '../domain/entities/user';
import { container } from '../inversify/config';
import UserRepository from '../domain/repository/userRepository';

@injectable()
export default class UserService implements UserRepository {

userDataService: UserRepository = container.get<UserRepository>('UserDataService');

    async create(user: User) {
        const result = await this.userDataService.create(user);
            return result;
    }

    async read(id: number) {
        const data = await this.userDataService.read(id);
            return data;
    }

    async update(user: User) {
        const result = await this.userDataService.update(user);
            return result;
    }

    async delete(id: number) {
        const result = await this.userDataService.delete(id);
            return result;
    }
}




